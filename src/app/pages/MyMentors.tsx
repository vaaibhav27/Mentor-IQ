import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Clock, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  MoreVertical,
  Activity,
  ArrowRight
} from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";
import { Link } from "react-router";

// Mocking the backend mentorship array based on State Machine logic
const mentorshipsMock = [
  { 
    id: "m1", 
    mentorName: "Dr. Sarah Chen", 
    state: "ACTIVE", 
    specialty: "System Design", 
    lastActive: "10 mins ago",
    milestones: { total: 10, completed: 4 },
    initials: "SC",
    avatarColor: "from-orange-500 to-amber-500"
  },
  { 
    id: "m2", 
    mentorName: "Marcus Thorne", 
    state: "AWAITING_FIRST_RESPONSE", 
    specialty: "Frontend Architecture", 
    slaTimeLeft: "14h:32m",
    initials: "MT",
    avatarColor: "from-blue-500 to-cyan-500"
  },
  { 
    id: "m3", 
    mentorName: "Priya Patel", 
    state: "REQUESTED", 
    specialty: "Python ML Options", 
    slaTimeLeft: "Pending Mentor Acceptance",
    initials: "PP",
    avatarColor: "from-purple-500 to-pink-500"
  }
];

export default function MyMentors() {
  const [mentorships, setMentorships] = useState(mentorshipsMock);

  const getStateStyle = (state: string) => {
    switch(state) {
      case "ACTIVE": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "AWAITING_FIRST_RESPONSE": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "REQUESTED": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "STALLED": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getProgressState = (state: string) => {
    const states = ["REQUESTED", "ACCEPTED", "AWAITING_FIRST_RESPONSE", "ACTIVE", "COMPLETED"];
    return Math.max(0, states.indexOf(state));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">Active Mentorships</h1>
          <p className="text-slate-400">Track and manage your MentorIQ <span className="text-orange-400 font-medium">Lifecycle Engine</span> connections.</p>
        </div>
        <Link to="/dashboard/marketplace" className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.3)]">
          <Target className="w-5 h-5" />
          Find New Mentor
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Tracking List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {mentorships.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="bg-[#161B22]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-sm">
                  
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.avatarColor} flex items-center justify-center font-bold text-xl text-white shadow-inner`}>
                        {m.initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-100 hover:text-white transition-colors">{m.mentorName}</h3>
                        <div className="text-slate-400 text-sm font-medium flex items-center gap-2 mt-0.5">
                          <Activity className="w-3.5 h-3.5 text-orange-400" /> Topic: {m.specialty}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                       <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border ${getStateStyle(m.state)}`}>
                         {m.state}
                       </span>
                       <button className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                         <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </div>

                  {/* State Machine Visualization */}
                  <div className="bg-[#0D1117] rounded-xl p-5 border border-slate-800/50 mb-6 relative overflow-hidden">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Lifecycle State Tracker</h4>
                    
                    <div className="relative flex justify-between items-center z-10">
                       <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2 z-0" />
                       <div className="absolute top-1/2 left-0 h-[2px] bg-orange-500 -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: `${(getProgressState(m.state) / 4) * 100}%` }} />
                       
                       {['Requested', 'Accepted', 'Awaiting SLA', 'Active', 'Completed'].map((step, i) => {
                         const isPast = getProgressState(m.state) >= i;
                         const isActive = getProgressState(m.state) === i;
                         return (
                           <div key={i} className="flex flex-col items-center gap-2 z-10 relative">
                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isPast ? 'bg-orange-500 border-orange-500 text-white' : isActive ? 'bg-[#0D1117] border-orange-500' : 'bg-[#161B22] border-slate-700'}`}>
                               {isPast && <CheckCircle2 className="w-3.5 h-3.5" />}
                             </div>
                             <span className={`text-[9px] uppercase font-extrabold tracking-wider absolute top-8 whitespace-nowrap ${isActive ? 'text-orange-400' : isPast ? 'text-slate-300' : 'text-slate-600'}`}>
                               {step}
                             </span>
                           </div>
                         );
                       })}
                    </div>
                    <div className="h-4" /> {/* Spacer for absolute text */}
                  </div>

                  {/* Action Footer */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-5">
                    <div className="flex items-center gap-2 text-sm">
                      {m.state === 'ACTIVE' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-slate-300 font-medium">Next Week: <strong className="text-white">Milestone 5</strong></span>
                          <span className="text-slate-500 mx-2">•</span>
                          <span className="text-slate-400">Last active: {m.lastActive}</span>
                        </>
                      ) : m.state === 'AWAITING_FIRST_RESPONSE' ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-slate-300 font-medium whitespace-nowrap flex items-center gap-1.5 border border-orange-500/20 bg-orange-500/5 px-2 py-0.5 rounded">
                            SLA Enforcement Timer: <span className="text-orange-400 font-bold font-mono">{m.slaTimeLeft}</span>
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-500 italic">Waiting on backend matching cron...</span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      {m.state === 'ACTIVE' && (
                        <Link to={`/dashboard/workspace`} className="px-4 py-2 border border-slate-700 hover:border-orange-500/50 text-slate-300 hover:text-orange-400 rounded-lg transition-all text-sm font-medium flex items-center gap-2 bg-[#0D1117]">
                           <Target className="w-4 h-4" /> Workspace
                        </Link>
                      )}
                      <Link to={`/dashboard/chat/${m.id}`} className="px-4 py-2 bg-[#0D1117] hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white rounded-lg transition-all text-sm font-medium flex items-center gap-2">
                         <MessageSquare className="w-4 h-4 text-slate-400" />
                         {m.state === 'ACTIVE' ? 'Message' : 'Status'}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar Info Panel */}
        <div className="space-y-6">
          <TiltCard tiltAmount={2}>
            <div className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-purple-400"/> SLA Engine Policy</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Our strict Service Level Agreement ensures mentors reply within their advertised tier. If a mentor's SLA timer expires during `<span className="text-orange-400 font-mono text-xs">AWAITING_FIRST_RESPONSE</span>`, they trigger an automatic <strong>Reliability Score penalty</strong>.
              </p>
              <div className="space-y-3">
                 <div className="bg-[#0D1117] border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                   <div className="text-sm font-bold text-slate-300">Fast Tier</div>
                   <div className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded font-mono border border-orange-500/20">6 Hours</div>
                 </div>
                 <div className="bg-[#0D1117] border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                   <div className="text-sm font-bold text-slate-300">Pro Tier</div>
                   <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono border border-blue-500/20">24 Hours</div>
                 </div>
              </div>
            </div>
          </TiltCard>

           <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/10 border border-orange-500/30 rounded-2xl p-6 flex flex-col justify-between">
             <div className="mb-4">
               <h3 className="text-xl font-bold text-white mb-2">Want to level up?</h3>
               <p className="text-slate-300 text-sm">Having multiple mentors accelerates different skill trees simultaneously. You still have 1 active request left in your tier.</p>
             </div>
             <Link to="/dashboard/marketplace" className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-center text-sm font-bold transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)]">
               Explore Top Matches
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
