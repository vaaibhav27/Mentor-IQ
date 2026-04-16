import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  ArrowRight,
  MoreVertical,
  Calendar
} from "lucide-react";
import { motion } from "motion/react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { toast } from "sonner";
import { TiltCard } from "../components/ui/TiltCard";

const data = [
  { name: 'Mon', progress: 20 },
  { name: 'Tue', progress: 25 },
  { name: 'Wed', progress: 40 },
  { name: 'Thu', progress: 45 },
  { name: 'Fri', progress: 60 },
  { name: 'Sat', progress: 65 },
  { name: 'Sun', progress: 75 },
];

export default function LearnerDashboard() {
  const { profile } = useOutletContext<any>();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [roadmapGoal, setRoadmapGoal] = useState("");
  const [roadmapDuration, setRoadmapDuration] = useState("4 Weeks");

  useEffect(() => {
    async function fetchTasks() {
      try {
        // Mock data instead of backend fetch
        const mockTasks = [
          { id: "1", title: "Complete React Core Module", status: "pending", dueDate: "2026-04-15" },
          { id: "2", title: "Build First Layout", status: "completed", dueDate: "2026-04-10" },
          { id: "3", title: "Review UI/UX Principles", status: "pending", dueDate: "2026-04-20" }
        ];
        setTasks(mockTasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoadingTasks(false);
      }
    }
    fetchTasks();
  }, [profile.id]);

  const toggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      toast.success(`Task marked as ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const generateAIRoadmap = () => {
    if (!roadmapGoal) return toast.error("Please enter a learning goal");
    setIsGeneratingRoadmap(true);
    setTimeout(() => {
      setTasks([
        ...tasks,
        { id: `ai-${Date.now()}-1`, title: `[AI] Week 1: Core concepts of ${roadmapGoal}`, status: "pending", dueDate: "Friday" },
        { id: `ai-${Date.now()}-2`, title: `[AI] Week 2: Intermediate build for ${roadmapGoal}`, status: "pending", dueDate: "Next Friday" }
      ]);
      setIsGeneratingRoadmap(false);
      setShowRoadmapModal(false);
      setRoadmapGoal("");
      toast.success("AI Roadmap successfully generated and applied to your milestones!");
    }, 1500);
  };

  const stats = [
    { label: "Overall Goal Progress", value: "65%", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Consistency Score", value: "92%", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Mentorship State", value: "ACTIVE", icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Drop-off Risk", value: "Low (0.1)", icon: AlertCircle, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">Welcome back, {profile?.name?.split(' ')[0]}!</h1>
          <p className="text-slate-400">You're making great progress in <span className="text-orange-400 font-medium">{profile?.goals?.[0] || 'your goals'}</span>.</p>
        </div>
        <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)]">
          <Plus className="w-5 h-5" />
          Request Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <TiltCard key={idx} tiltAmount={10}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#161B22]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors h-full"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} border border-white/5 rounded-xl flex items-center justify-center transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-400">{stat.label}</div>
                  <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-100">Skill Progression</h3>
            <div className="flex gap-2 p-1 bg-[#0D1117] rounded-lg border border-slate-800">
              <button className="px-3 py-1 bg-transparent text-slate-400 text-xs font-bold rounded-md hover:text-white">WEEK</button>
              <button className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-md shadow-sm">MONTH</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161B22', border: '1px solid #1e293b', borderRadius: '12px', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f97316' }}
                />
                <Area type="monotone" dataKey="progress" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Assigned Mentors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-100">Mapped Mentors</h3>
            <button className="text-orange-400 text-sm font-medium hover:text-orange-300">View All</button>
          </div>
          <div className="space-y-4 mb-4">
            {[
              { name: "Dr. Sarah Chen", role: "Sr. Software Architect", status: "Online", initials: "SC" },
              { name: "Marcus Thorne", role: "Product Design Lead", status: "Offline", initials: "MT" }
            ].map((mentor, idx) => (
              <TiltCard key={idx} tiltAmount={5}>
                <div className="flex items-center gap-4 p-4 bg-[#0D1117] border border-slate-800/80 rounded-xl hover:border-slate-700 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white shadow-inner">
                    {mentor.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{mentor.name}</div>
                    <div className="text-xs text-slate-500">{mentor.role}</div>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full border-2 border-[#0D1117] ${mentor.status === 'Online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-600'}`} />
                </div>
              </TiltCard>
            ))}
          </div>
          <button className="w-full mt-auto py-3.5 border border-dashed border-slate-700 rounded-xl text-slate-400 font-medium hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/5 transition-all flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Find More Mentors
          </button>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Accountability Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-100">Accountability Milestones</h3>
              <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold rounded uppercase tracking-wider">Week 3</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowRoadmapModal(true)}
                className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 uppercase tracking-wider shadow-inner"
              >
                <Plus className="w-3.5 h-3.5" /> AI Roadmap Generator
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {loadingTasks ? (
              <div className="py-12 flex flex-col items-center gap-3">
                 <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                 <p className="text-slate-500 text-sm">Syncing roadmap...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="py-12 flex flex-col items-center gap-4 bg-[#0D1117]/80 rounded-xl border border-dashed border-slate-800">
                <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-500">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-slate-300 font-semibold mb-1">No pending tracks</p>
                  <p className="text-slate-500 text-sm">Request sheets from a mentor</p>
                </div>
              </div>
            ) : tasks.map((task) => (
              <div 
                key={task.id} 
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  task.status === 'completed' 
                    ? 'bg-green-500/5 border-green-500/20' 
                    : 'bg-[#0D1117] border-slate-800/80 hover:border-orange-500/30'
                }`}
              >
                <button 
                  onClick={() => toggleTask(task.id, task.status)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    task.status === 'completed' 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-slate-700 bg-[#161B22] group-hover:border-orange-500'
                  }`}
                >
                  {task.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div className="flex-1">
                  <div className={`text-sm font-semibold transition-colors ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-purple-400" />
                        Req. Quiz: 70%
                      </span>
                      {task.status !== 'completed' && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <AlertCircle className="w-3 h-3" />
                          Needs Mentor Approval
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Intelligence Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-slate-100">MentorIQ Intelligence</h3>
          </div>
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <TiltCard tiltAmount={3}>
              <div className="bg-[#0D1117] border border-orange-500/20 rounded-xl p-5 shadow-[0_0_15px_rgba(234,88,12,0.05)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-bold mb-1.5 text-sm">Matching Insight</div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Based on your recent activity in <span className="text-orange-400 font-medium">React</span>, we recommend connecting with a mentor specialized in <span className="text-orange-400 font-medium">Advanced State Management</span> to optimize your learning curve.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            <div className="space-y-4 bg-[#0D1117] border border-slate-800/50 rounded-xl p-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">RiskScore™ Analysis</span>
                <span className="text-green-400 font-bold">0.1/1.0</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "10%" }} 
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold rounded uppercase">Inactivity: 0.0</span>
                <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold rounded uppercase">Quiz Decline: 0.0</span>
                <span className="px-2 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[9px] font-bold rounded uppercase">No Reply: 0.3</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-2">
                Your drop-off risk is extremely low. Keep up the solid performance!
              </p>
            </div>

            <button className="w-full flex items-center justify-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors group mt-auto py-2">
              View Comprehensive Report
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* AI Roadmap Modal */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#161B22] border border-orange-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" /> Generate AI Roadmap
            </h3>
            <p className="text-sm text-slate-400 mb-6">Enter your specific goal, and MentorIQ will query the Intelligence Engine to outline strict week-by-week milestones.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Learning Goal</label>
                <input 
                  type="text" 
                  placeholder="e.g., Learn Advanced React Context" 
                  value={roadmapGoal}
                  onChange={(e) => setRoadmapGoal(e.target.value)}
                  className="w-full bg-[#0D1117] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500/50 shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Timeframe</label>
                <select 
                  value={roadmapDuration}
                  onChange={(e) => setRoadmapDuration(e.target.value)}
                  className="w-full bg-[#0D1117] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500/50 shadow-inner"
                >
                  <option>4 Weeks</option>
                  <option>8 Weeks</option>
                  <option>12 Weeks</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowRoadmapModal(false)}
                className="flex-1 py-3 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={generateAIRoadmap}
                disabled={isGeneratingRoadmap}
                className="flex-[2] py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGeneratingRoadmap ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating...</>
                ) : (
                  "Create Milestones"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}