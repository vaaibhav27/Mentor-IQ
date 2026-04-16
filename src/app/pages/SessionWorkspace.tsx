import { useState } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  CheckSquare, 
  Target, 
  Clock, 
  AlertCircle,
  Video,
  ChevronLeft,
  Calendar,
  Save,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router";

export default function SessionWorkspace() {
  const [activeTab, setActiveTab] = useState("agenda");
  
  return (
    <div className="h-full flex gap-6 bg-[#0D1117] pb-4 max-w-7xl mx-auto">
      {/* Session Navigation Sidebar */}
      <div className="w-64 hidden xl:flex flex-col bg-[#161B22]/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shrink-0 h-full">
        <div className="p-6 border-b border-slate-800/80">
          <Link to="/dashboard/learner" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h3 className="text-xl font-bold text-slate-100 tracking-tight leading-tight">System Design Mentorship</h3>
          <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mt-2">Dr. Sarah Chen</p>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-2">
           <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-3">Session Navigation</div>
           {[
             { id: 'agenda', icon: Calendar, label: "Agenda & Plan" },
             { id: 'notes', icon: FileText, label: "Private Notes" },
             { id: 'action', icon: CheckSquare, label: "Action Items" },
             { id: 'alignment', icon: Target, label: "Expectation Alignment" }
           ].map(t => (
             <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-inner' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
             >
                <t.icon className="w-4 h-4" />
                {t.label}
             </button>
           ))}
        </div>
        
        <div className="p-4 border-t border-slate-800/80">
          <Link to="/dashboard/chat/1" className="w-full flex items-center justify-center gap-2 bg-[#0D1117] hover:bg-slate-800 text-slate-300 py-3 rounded-xl border border-slate-700/80 transition-colors shadow-sm text-sm font-medium">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            Open Chat Room
          </Link>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full bg-[#161B22]/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl relative">
        <header className="px-8 py-6 border-b border-slate-800/80 bg-[#161B22] flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-white capitalize">Session {activeTab}</h2>
              <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">Session 3</span>
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" /> Scheduled for Tomorrow, 2:00 PM EST
            </p>
          </div>
          <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] flex items-center gap-2 font-medium">
            <Video className="w-5 h-5" /> Join Call
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
           {/* Decorative visual element */}
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
           
           {activeTab === 'agenda' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
               <div className="bg-[#0D1117]/80 rounded-2xl border border-slate-800/80 p-6 shadow-inner">
                 <h3 className="text-lg font-bold text-white mb-4">Proposed Agenda</h3>
                 <textarea 
                   className="w-full h-32 bg-[#161B22] border border-slate-700/80 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500/50 resize-none font-mono text-sm shadow-inner"
                   placeholder="- Review distributed caching strategies
- Analyze CAP theorem implications
- Q&A on last week's milestone"
                   defaultValue="- Review distributed caching strategies\n- Analyze CAP theorem implications\n- Q&A on last week's milestone"
                 />
                 <div className="flex justify-end mt-4">
                   <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors">
                     <Save className="w-4 h-4" /> Save Agenda
                   </button>
                 </div>
               </div>
               
               <div className="bg-[#0D1117]/80 rounded-2xl border border-slate-800/80 p-6 shadow-inner">
                 <h3 className="text-lg font-bold text-white mb-4">Mentor Input</h3>
                 <p className="text-slate-400 text-sm leading-relaxed p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                   "Please make sure to read the Redis architecture whitepaper before we jump on the call. It will form the basis of our discussion today."
                 </p>
               </div>
             </motion.div>
           )}

           {activeTab === 'alignment' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
               <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
                 <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                 <div>
                   <h3 className="text-orange-400 font-bold mb-1">Expectation Alignment Form</h3>
                   <p className="text-slate-400 text-sm">This ensures the mentor and learner are 100% aligned on SLA, duration, and goals to prevent misalignment and ghosting.</p>
                 </div>
               </div>

               <div className="space-y-6 bg-[#0D1117] p-8 rounded-2xl border border-slate-800/80 shadow-inner">
                 <div className="grid grid-cols-2 gap-8">
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Learning Goal</label>
                     <select className="w-full bg-[#161B22] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-orange-500/50">
                       <option>System Design Mastery</option>
                       <option>Frontend Job Prep</option>
                       <option>DSA Interview Prep</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expected Duration</label>
                     <select className="w-full bg-[#161B22] border border-slate-700/80 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-orange-500/50">
                       <option>3 Months</option>
                       <option>1 Month</option>
                       <option>6 Months</option>
                     </select>
                   </div>
                 </div>

                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Mutual Commitments</label>
                   <div className="space-y-3">
                     <label className="flex items-center gap-3 p-4 bg-[#161B22] border border-green-500/30 rounded-xl cursor-pointer">
                       <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-500" />
                       <span className="text-sm text-slate-300">I commit to a 24-hour response SLA (Pro Tier)</span>
                     </label>
                     <label className="flex items-center gap-3 p-4 bg-[#161B22] border border-green-500/30 rounded-xl cursor-pointer">
                       <input type="checkbox" defaultChecked className="w-5 h-5 accent-green-500" />
                       <span className="text-sm text-slate-300">I commit to 4 hours of weekly engagement</span>
                     </label>
                   </div>
                 </div>
               </div>
             </motion.div>
           )}
           
           {(activeTab === 'notes' || activeTab === 'action') && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center">
               <div className="text-center">
                 <div className="w-20 h-20 bg-[#0D1117] rounded-3xl mx-auto mb-6 flex items-center justify-center border border-slate-800 shadow-inner">
                   <FileText className="w-8 h-8 text-slate-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-200 mb-2">Private Mentorship Workspace</h3>
                 <p className="text-slate-500 text-sm max-w-sm">Use this secure area to store private session notes and track action items offline.</p>
               </div>
             </motion.div>
           )}
        </div>
      </div>
    </div>
  );
}
