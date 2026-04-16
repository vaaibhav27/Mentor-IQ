import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const getSupabase = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
  );
};

// --- AUTH & PROFILE ---

app.post("/make-server-4a8099e1/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    const supabase = getSupabase();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      email_confirm: true
    });

    if (error) return c.json({ error: error.message }, 400);

    // Initialize profile in KV store
    const profile = {
      id: data.user.id,
      email,
      name,
      role, // 'mentor' or 'learner'
      onboarded: false,
      createdAt: new Date().toISOString(),
    };
    await kv.set(`profile:${data.user.id}`, profile);

    return c.json({ user: data.user, profile });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.get("/make-server-4a8099e1/profile", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) return c.json({ error: "Missing auth header" }, 401);
  
  const token = authHeader.split(" ")[1];
  const supabase = getSupabase();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) return c.json({ error: "Unauthorized" }, 401);

  const profile = await kv.get(`profile:${user.id}`);
  return c.json(profile || { id: user.id, email: user.email, name: user.user_metadata.name, role: user.user_metadata.role });
});

app.put("/make-server-4a8099e1/profile", async (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const updates = await c.req.json();
  const existingProfile = await kv.get(`profile:${user.id}`) || {};
  const newProfile = { ...existingProfile, ...updates, id: user.id, onboarded: true };
  
  await kv.set(`profile:${user.id}`, newProfile);
  
  // If role is mentor, add to mentor registry
  if (newProfile.role === 'mentor') {
    const mentors = await kv.get('registry:mentors') || [];
    if (!mentors.find((m: any) => m.id === user.id)) {
      mentors.push({
        id: user.id,
        name: newProfile.name,
        skills: newProfile.skills || [],
        experience: newProfile.experience,
        rating: 4.8 + Math.random() * 0.2 // Initial fake rating
      });
      await kv.set('registry:mentors', mentors);
    } else {
      // Update mentor info
      const idx = mentors.findIndex((m: any) => m.id === user.id);
      mentors[idx] = { ...mentors[idx], ...newProfile };
      await kv.set('registry:mentors', mentors);
    }
  }

  return c.json(newProfile);
});

// --- MENTOR MARKETPLACE ---

app.get("/make-server-4a8099e1/mentors", async (c) => {
  const mentors = await kv.get('registry:mentors') || [];
  return c.json(mentors);
});

// --- TASKS ---

app.post("/make-server-4a8099e1/tasks", async (c) => {
  const { learnerId, title, description, dueDate } = await c.req.json();
  const tasks = await kv.get(`tasks:${learnerId}`) || [];
  const newTask = {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  await kv.set(`tasks:${learnerId}`, tasks);
  return c.json(newTask);
});

app.get("/make-server-4a8099e1/tasks/:learnerId", async (c) => {
  const learnerId = c.req.param('learnerId');
  const tasks = await kv.get(`tasks:${learnerId}`) || [];
  return c.json(tasks);
});

app.put("/make-server-4a8099e1/tasks/:learnerId/:taskId", async (c) => {
  const { learnerId, taskId } = c.req.param();
  const { status } = await c.req.json();
  const tasks = await kv.get(`tasks:${learnerId}`) || [];
  const updatedTasks = tasks.map((t: any) => t.id === taskId ? { ...t, status } : t);
  await kv.set(`tasks:${learnerId}`, updatedTasks);
  return c.json({ success: true });
});

// --- MESSAGES (Simple Chat Store) ---

app.get("/make-server-4a8099e1/chats", async (c) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const chats = await kv.get(`user_chats:${user.id}`) || [];
  return c.json(chats);
});

app.post("/make-server-4a8099e1/messages", async (c) => {
  const { receiverId, text } = await c.req.json();
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const chatId = [user.id, receiverId].sort().join(':');
  const messages = await kv.get(`chat:${chatId}`) || [];
  const newMessage = {
    id: crypto.randomUUID(),
    senderId: user.id,
    text,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  await kv.set(`chat:${chatId}`, messages);

  // Update recent chat lists for both users
  const updateChatList = async (uid: string, otherId: string) => {
    const lists = await kv.get(`user_chats:${uid}`) || [];
    if (!lists.includes(otherId)) {
      lists.push(otherId);
      await kv.set(`user_chats:${uid}`, lists);
    }
  };
  await updateChatList(user.id, receiverId);
  await updateChatList(receiverId, user.id);

  return c.json(newMessage);
});

app.get("/make-server-4a8099e1/messages/:otherId", async (c) => {
  const otherId = c.req.param('otherId');
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const chatId = [user.id, otherId].sort().join(':');
  const messages = await kv.get(`chat:${chatId}`) || [];
  return c.json(messages);
});

// Health check endpoint
app.get("/make-server-4a8099e1/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);