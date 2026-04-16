import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Shield, 
  Target, 
  Clock, 
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { projectId } from "/utils/supabase/info";
import { Link } from "react-router";
import { TiltCard } from "../components/ui/TiltCard";

export default function MentorMarketplace() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMentors() {
      try {
        const mockMentors = [
          { 
            id: "1", name: "Dr. Sarah Chen", experience: "10+ years", rating: 4.9, 
            skills: ["System Design", "Cloud Architecture", "Go"],
            scores: { reliability: 98, response: "Fast (2h)", stackMatch: 100, mentorScore: 97 }
          },
          { 
            id: "2", name: "Marcus Thorne", experience: "5-10 years", rating: 4.8, 
            skills: ["React", "UI/UX", "Product Strategy"],
            scores: { reliability: 90, response: "Pro (6h)", stackMatch: 80, mentorScore: 89 }
          },
          { 
            id: "3", name: "Priya Patel", experience: "10+ years", rating: 5.0, 
            skills: ["Machine Learning", "Python", "Data Science"],
            scores: { reliability: 99, response: "Fast (1h)", stackMatch: 90, mentorScore: 98 }
          },
          { 
            id: "4", name: "James Wilson", experience: "3-5 years", rating: 4.7, 
            skills: ["Node.js", "Express", "MongoDB"],
            scores: { reliability: 85, response: "Basic (24h)", stackMatch: 70, mentorScore: 82 }
          },
        ];
        setMentors(mockMentors);
      } catch (err) {
        console.error("Failed to fetch mentors", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.skills.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">Mentor Marketplace</h1>
          <p className="text-slate-400">Find the perfect expert matching your skills and goals.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search skills, names..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#161B22]/80 backdrop-blur-xl border border-slate-700/80 text-white text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-inner" 
            />
          </div>
          <button className="px-4 py-2.5 bg-[#161B22] border border-slate-700/80 text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Smart Suggestion Hero */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 rounded-3xl p-8 border border-orange-500/20 mb-8">
        <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
           <Zap className="w-5 h-5 text-orange-400" /> Auto-Matched by Intelligence Engine
        </h2>
        <p className="text-sm text-slate-400 mb-6 max-w-2xl">
          Based on your gap analysis (System Design, Go), we applied the <strong className="text-slate-300">MentorScore Algorithm</strong> to find your perfect match.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-[#0D1117]/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-5 flex items-center gap-6">
             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-3xl text-white shadow-inner">
               S
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-slate-100">Dr. Sarah Chen</h3>
                  <div className="flex items-center gap-1.5 text-orange-400 font-bold text-sm bg-orange-500/10 px-2 rounded-md">
                    <Target className="w-4 h-4" /> 97 Score
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-3">10+ years • System Design, Go</p>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span><span className="text-green-400">98%</span> Reliability</span>
                  <span><span className="text-blue-400">100%</span> Stack Match</span>
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-[400px] bg-[#161B22]/50 border border-slate-800/80 rounded-3xl animate-pulse" />
          ))
        ) : filteredMentors.length === 0 ? (
          <div className="col-span-full py-20 text-center">
             <div className="w-16 h-16 bg-[#161B22] rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800 text-slate-500 shadow-inner">
               <Search className="w-8 h-8" />
             </div>
             <p className="text-slate-100 font-bold mb-1">No mentors found</p>
             <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : filteredMentors.map((mentor, idx) => (
          <TiltCard key={mentor.id} tiltAmount={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-[#0D1117] border border-slate-800/80 rounded-3xl overflow-hidden hover:border-orange-500/40 transition-all shadow-sm h-full flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-2xl text-white shadow-inner">
                    {mentor.name?.[0]}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
                      <Shield className="w-3 h-3" />
                      Verified
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm bg-amber-500/10 px-2 rounded-md">
                      <Star className="w-4 h-4 fill-amber-400" />
                      {mentor.rating?.toFixed(1) || '4.8'}
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-orange-400 transition-colors">{mentor.name}</h3>
                  <p className="text-slate-400 text-sm font-medium">{mentor.experience} Experience</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 content-start h-[72px] overflow-hidden">
                  {mentor.skills?.slice(0, 5).map((skill: string) => (
                    <span key={skill} className="px-2.5 py-1 bg-slate-800/50 text-slate-300 text-[11px] font-bold rounded-md border border-slate-700/50">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="bg-slate-800/20 rounded-xl p-4 border border-slate-800/80 mb-6">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700/50">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall MentorScore</span>
                     <span className="text-xl font-extrabold text-orange-400">{mentor.scores?.mentorScore}/100</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">SLA Tier</div>
                      <div className="text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        {mentor.scores?.response}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Reliability</div>
                      <div className="text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-green-400" />
                        {mentor.scores?.reliability}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Stack Match</div>
                      <div className="text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1">
                        <Target className="w-3 h-3 text-blue-400" />
                        {mentor.scores?.stackMatch}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Link 
                    to={`/dashboard/chat/${mentor.id}`}
                    className="flex-1 bg-[#161B22] hover:bg-slate-800 border border-slate-700/80 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <MessageSquare className="w-5 h-5 text-slate-400 group-hover/btn:text-orange-400 transition-colors" />
                    Message
                  </Link>
                  <button className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                    Connect
                  </button>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}