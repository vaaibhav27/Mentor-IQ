import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  CheckCheck,
  Target,
  Clock,
  ChevronLeft,
  Loader2,
  MessageSquare
} from "lucide-react";
import { motion } from "motion/react";
import { projectId } from "/utils/supabase/info";
import { toast } from "sonner";

export default function ChatPage() {
  const { userId } = useParams();
  const { profile } = useOutletContext<any>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch conversations
  useEffect(() => {
    async function fetchConversations() {
      try {
        const chatIds = ['1', '2'];
        const mockConvos = chatIds.map((id: string) => ({
          id,
          name: id === '1' ? 'Dr. Sarah Chen' : 'Alex Johnson',
          lastMessage: "Looking forward to our next session!",
          timestamp: "2:30 PM",
          online: Math.random() > 0.5,
          initials: id === '1' ? 'SC' : 'AJ'
        }));
        
        if (userId && !mockConvos.find((c: any) => c.id === userId)) {
          mockConvos.push({
            id: userId,
            name: "New Contact",
            lastMessage: "Start a conversation",
            timestamp: "Now",
            online: true,
            initials: "U"
          });
        }
        
        setConversations(mockConvos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, [userId]);

  // Fetch messages for selected user
  useEffect(() => {
    if (!userId) return;

    async function fetchMessages() {
      try {
        // Mock data
        const data = [
          { id: 1, senderId: "mock_peer", text: "Hi! How is your progress?", timestamp: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, senderId: profile?.id, text: "Almost done with the module.", timestamp: new Date(Date.now() - 3500000).toISOString() }
        ];
        // Only set if messages are empty to avoid overriding new local messages
        setMessages((prev) => prev.length === 0 ? data : prev);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();
  }, [userId, profile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !userId || sending) return;

    setSending(true);

    try {
      setTimeout(() => {
        const newMessage = { 
          id: Date.now(), 
          senderId: profile?.id, 
          text: inputText, 
          timestamp: new Date().toISOString() 
        };
        setMessages([...messages, newMessage]);
        setInputText("");
        setSending(false);
      }, 300);
    } catch (err) {
      toast.error("Failed to send message");
      setSending(false);
    }
  };

  const selectedConvo = conversations.find(c => c.id === userId);

  return (
    <div className="h-full flex gap-6 bg-[#0D1117] pb-4">
      {/* Conversations List */}
      <div className={`w-full lg:w-80 flex flex-col bg-[#161B22]/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden ${userId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-6 border-b border-slate-800/80">
          <h3 className="text-xl font-bold text-slate-100 mb-4 tracking-tight">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-[#0D1117] border border-slate-700/80 text-xs text-slate-200 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-orange-500/50 shadow-inner" 
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-sm font-medium">No conversations yet</div>
          ) : conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => navigate(`/dashboard/chat/${convo.id}`)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                userId === convo.id 
                  ? "bg-orange-500/10 border border-orange-500/20" 
                  : "hover:bg-slate-800/40 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${userId === convo.id ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-inner' : 'bg-slate-800/80 text-slate-300'}`}>
                  {convo.initials}
                </div>
                {convo.online && (
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#161B22] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className={`text-sm font-bold truncate transition-colors ${userId === convo.id ? 'text-orange-400' : 'text-slate-200'}`}>
                  {convo.name}
                </div>
                <div className={`text-xs truncate transition-colors mt-0.5 ${userId === convo.id ? 'text-orange-200/80' : 'text-slate-500'}`}>
                  {convo.lastMessage}
                </div>
              </div>
              <div className={`text-[10px] font-bold uppercase ${userId === convo.id ? 'text-orange-300/70' : 'text-slate-600'}`}>
                {convo.timestamp}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Window */}
      <div className={`flex-1 flex flex-col bg-[#161B22]/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden ${!userId ? 'hidden lg:flex' : 'flex'}`}>
        {userId ? (
          <>
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between bg-[#161B22]/90 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/dashboard/chat')}
                  className="lg:hidden p-2 text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-white shadow-inner">
                    {selectedConvo?.initials || "U"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#161B22] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-100">{selectedConvo?.name || "User"}</div>
                  <div className="text-[10px] text-green-400 font-bold uppercase tracking-wider mt-0.5">Active Now</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-400 hover:text-orange-400 hover:bg-[#0D1117] rounded-xl transition-all">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-orange-400 hover:bg-[#0D1117] rounded-xl transition-all">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-slate-200 hover:bg-[#0D1117] rounded-xl transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#161B22]/50 via-[#0D1117]/80 to-[#0D1117]"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-10">
                   <div className="w-20 h-20 bg-[#0D1117] border border-slate-800 rounded-3xl flex items-center justify-center mb-6 text-slate-600 shadow-inner">
                     <Target className="w-10 h-10" />
                   </div>
                   <h4 className="text-slate-100 font-bold mb-2 text-lg">New Mentorship Connection</h4>
                   <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                     Start your journey by introducing yourself and setting your first milestone.
                   </p>
                </div>
              ) : messages.map((msg, idx) => {
                const isMe = msg.senderId === profile?.id;
                return (
                  <motion.div
                    key={msg.id || idx}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] space-y-1 ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`p-4 rounded-2xl shadow-lg border ${
                        isMe 
                          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-none border-orange-400/20" 
                          : "bg-[#161B22] text-slate-200 rounded-bl-none border-slate-800/80"
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider pt-1 ${isMe ? "text-slate-400" : "text-slate-600"}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {isMe && <CheckCheck className="w-3.5 h-3.5 text-orange-400" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Input */}
            <div className="p-6 bg-[#161B22]/90 backdrop-blur-xl border-t border-slate-800/80 rounded-b-3xl">
              <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <button type="button" className="p-2.5 text-slate-500 hover:text-slate-300 transition-colors bg-[#0D1117] rounded-xl border border-slate-800/50">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-[#0D1117] border border-slate-700/80 text-white rounded-xl py-3.5 px-5 pr-12 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all shadow-inner"
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-orange-400 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!inputText.trim() || sending}
                  className="w-[52px] h-[52px] bg-orange-600 hover:bg-orange-500 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 group flex-shrink-0"
                >
                  {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                </button>
              </form>
              <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-600" /> SLA: &lt;6h response</span>
                <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-slate-600" /> Milestone Focused</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[radial-gradient(circle_at_center,_rgba(234,88,12,0.03)_0%,_transparent_100%)]">
            <div className="w-24 h-24 bg-[#0D1117] border border-slate-800/50 rounded-[2rem] flex items-center justify-center mb-8 text-slate-700 shadow-inner">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Your Conversations</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
              Select a mentor or learner from the sidebar to start a structured, accountability-driven conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}