import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { 
  Users, 
  Target, 
  CheckCircle2, 
  Clock, 
  Plus,
  ArrowRight,
  MoreVertical,
  Briefcase,
  AlertCircle,
  Calendar,
  MessageSquare,
  Shield
} from "lucide-react";
import { motion } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { projectId } from "/utils/supabase/info";
import { toast } from "sonner";
import { Link } from "react-router";
import { TiltCard } from "../components/ui/TiltCard";

const data = [
  { name: 'Active', value: 8, color: '#f97316' },
  { name: 'Completed', value: 12, color: '#22c55e' },
  { name: 'Pending', value: 3, color: '#f59e0b' },
  { name: 'At Risk', value: 1, color: '#ef4444' },
];

export default function MentorDashboard() {
  const { profile } = useOutletContext<any>();
  const [mentees, setMentees] = useState<any[]>([
    { id: '1', name: 'Alex Johnson', level: 'Beginner', goal: 'React Mastery', progress: 65, status: 'Active', initials: 'AJ' },
    { id: '2', name: 'Elena Vance', level: 'Intermediate', goal: 'System Design', progress: 40, status: 'At Risk', initials: 'EV' },
    { id: '3', name: 'Jordan Smith', level: 'Advanced', goal: 'Cloud Architect', progress: 85, status: 'Active', initials: 'JS' }
  ]);

  const stats = [
    { label: "Completion Rate", value: "98%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Avg Response (SLA)", value: "1.2 hrs", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Reliability Score", value: "99/100", icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Ghost Rate", value: "0.0%", icon: AlertCircle, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const [showCommitmentModal, setShowCommitmentModal] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState<string | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [commitSLA, setCommitSLA] = useState(false);

  const handleAcceptMentee = (menteeId: string) => {
    setSelectedMentee(menteeId);
    setShowCommitmentModal(true);
  };

  const confirmAcceptance = () => {
    if (!commitSLA) return toast.error("You must guarantee the SLA tier to accept this Mentee.");
    setIsAccepting(true);
    setTimeout(() => {
      setIsAccepting(false);
      setShowCommitmentModal(false);
      toast.success("Legally committed to SLA! Mentees mentorship state is now ACTIVE.");
    }, 1500);
  };

  const handleAssignTask = async (menteeId: string) => {
    const title = prompt("Enter task title:");
    if (!title) return;
    
    try {
      // Mock assignment
      setTimeout(() => {
        toast.success("Task assigned successfully!");
      }, 500);
    } catch (err) {
      toast.error("Failed to assign task");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">Mentor Command Center</h1>
          <p className="text-slate-400">Managing <span className="text-orange-400 font-medium">{stats[0].value} mentees</span> across multiple disciplines.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-[#161B22] border border-slate-700/80 hover:bg-slate-800 hover:text-white text-slate-300 rounded-lg transition-all font-medium">
             Update Capacity
           </button>
           <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)]">
             <Plus className="w-5 h-5" />
             New Resource
           </button>
        </div>
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
        {/* Mentee Management */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-100">Active Mentorships</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search mentees..." 
                className="bg-[#0D1117] border border-slate-700/80 text-xs text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/50" 
              />
            </div>
          </div>
          <div className="space-y-4">
            {mentees.map((mentee) => (
              <div key={mentee.id} className="group bg-[#0D1117] border border-slate-800/80 rounded-2xl p-5 hover:border-orange-500/30 transition-all shadow-sm">
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-xl text-white shadow-inner">
                    {mentee.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">{mentee.name}</div>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        mentee.status === 'Active' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                      }`}>
                        {mentee.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mt-1.5">
                      <span className="flex items-center gap-1"><Target className="w-3 h-3 text-orange-400" /> {mentee.goal}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-purple-400" /> {mentee.level}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {mentee.status === 'Pending' ? (
                      <button 
                        onClick={() => handleAcceptMentee(mentee.id)}
                        className="px-3 py-2 bg-green-500/10 border border-green-500/30 hover:bg-green-500 text-green-400 hover:text-white rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accept Request
                      </button>
                    ) : (
                      <>
                        <Link to={`/dashboard/workspace`} className="px-3 py-2 bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/50 text-orange-400 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                          <Target className="w-3.5 h-3.5" /> Workspace
                        </Link>
                        <Link to={`/dashboard/chat/${mentee.id}`} className="p-2.5 bg-[#161B22] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-all">
                          <MessageSquare className="w-4 h-4" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-500 uppercase tracking-wider">Roadmap Progress</span>
                    <span className="text-orange-400">{mentee.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${mentee.progress}%` }} 
                      className={`h-full ${mentee.status === 'At Risk' ? 'bg-red-500' : 'bg-orange-500'} transition-all duration-1000 shadow-[0_0_10px_rgba(234,88,12,0.4)]`} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-100">Engagement Distribution</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0D1117', border: '1px solid #1e293b', borderRadius: '12px', color: '#f1f5f9' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4 flex-1 flex flex-col justify-end">
             <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
               <div className="flex gap-3">
                 <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                 <div>
                   <div className="text-slate-200 text-sm font-bold">Risk Alert</div>
                   <p className="text-slate-400 text-xs mt-1">Elena Vance has missed her last 2 check-ins. Drop-off risk is high.</p>
                 </div>
               </div>
             </div>
             <button className="w-full flex items-center justify-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors group mt-2">
              View Detailed Analytics
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Commitment Lock Modal */}
      {showCommitmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#161B22] border border-orange-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-400" /> SLA Commitment Lock
            </h3>
            <p className="text-sm text-slate-400 mb-6">Before activating this mentorship, you must legally bind your SLA response tier into the State Engine.</p>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-[#0D1117] border border-orange-500/20 rounded-xl">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-bold text-slate-300">Your Declared Tier:</span>
                   <span className="text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider">Pro Tier (&lt;24h)</span>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed">
                   By accepting, the Mentee's state changes to <strong className="text-slate-300">ACTIVE</strong>. Any response exceeding 24 hours will automatically deduct your <strong className="text-red-400">Reliability Score</strong>.
                 </p>
              </div>

              <label className="flex items-center gap-3 p-4 bg-[#0D1117] border border-slate-700/80 rounded-xl cursor-pointer hover:border-orange-500/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={commitSLA}
                  onChange={(e) => setCommitSLA(e.target.checked)}
                  className="w-5 h-5 accent-orange-500 rounded border-slate-600" 
                />
                <span className="text-sm text-slate-300 font-medium">I guarantee the SLA and agree to MentorIQ routing terms.</span>
              </label>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCommitmentModal(false)}
                className="flex-1 py-3 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl font-medium transition-all"
              >
                Decline
              </button>
              <button 
                onClick={confirmAcceptance}
                disabled={isAccepting || !commitSLA}
                className="flex-[2] py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isAccepting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Locking...</>
                ) : (
                  "Accept & Lock SLA"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}