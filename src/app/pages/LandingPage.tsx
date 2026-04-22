import { motion } from "motion/react";
import { Link } from "react-router";
import { 
  ArrowRight, Target, Terminal, BookOpen, Code2, 
  Flame, LayoutDashboard, Cpu, Trophy, Sparkles, User, Settings, Compass, HelpCircle, 
  BarChart2, PlayCircle, Star
} from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";

export default function LandingPage() {
  return (
    <div className="flex h-screen bg-[#0D1117] text-white overflow-hidden font-sans">
      
      {/* Left Sidebar - Glassmorphic */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-slate-800/60 bg-[#161B22]/50 backdrop-blur-xl p-4 sticky top-0 shrink-0">
        <Link to="/" className="flex items-center gap-3 px-2 mb-8 mt-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-xl flex items-center justify-center p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0D1117] rounded-[10px] flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">MentorIQ</span>
        </Link>

        <div className="space-y-1 mb-8">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Platform</p>
          {[
            { icon: LayoutDashboard, label: "Home", active: true, path: "/dashboard/home" },
            { icon: Compass, label: "Explore Mentors", path: "/dashboard/marketplace" },
            { icon: Terminal, label: "Code Sessions", path: "/dashboard/workspace" },
            { icon: BarChart2, label: "Analytics", path: "/dashboard/home" },
          ].map((item, i) => (
            <Link to={item.path} key={i} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-slate-800/80 text-orange-400 font-medium' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}>
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="space-y-1 mb-auto">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Learning</p>
          {[
            { icon: BookOpen, label: "Study Sheets", path: "/dashboard/home" },
            { icon: Code2, label: "Algorithms", path: "/dashboard/home" },
            { icon: Trophy, label: "Achievements", path: "/dashboard/home" },
          ].map((item, i) => (
            <Link to={item.path} key={i} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 transition-colors">
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="space-y-1 pt-4 border-t border-slate-800/60">
          <Link to="/dashboard/home" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help & Support</span>
          </Link>
          <Link to="/dashboard/home" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Navbar */}
        <header className="sticky top-0 z-50 bg-[#0D1117]/80 backdrop-blur-xl border-b border-slate-800/60 px-6 py-4 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative group max-w-md w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Terminal className="w-4 h-4 text-slate-500" />
              </div>
              <input 
                type="text" 
                placeholder="Search mentors, algorithms, study sheets... (Press '/')"
                className="w-full bg-[#161B22]/80 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all shadow-inner cursor-text"
                onClick={() => { window.location.href = '/dashboard/home' }}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-400 rounded border border-slate-700">Cmd K</kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Sign up free
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-slate-300 mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Mentorship Intelligence Engine v2.0
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Learn faster. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                Code smarter.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The ultimate platform for structured tech mentorship. Master Data Structures, System Design, and Full-Stack Development with industry experts.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/dashboard/home" className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transform hover:-translate-y-0.5">
                Start Learning Now
              </Link>
              <button 
                onClick={() => document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-transparent border border-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg transition-all flex items-center gap-2 group"
              >
                <PlayCircle className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                View Tracks
              </button>
            </div>
          </motion.div>

          {/* 3D Track Cards */}
          <div id="tracks" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 relative z-10 pt-4">
            {[
              {
                title: "Frontend Mastery Sheet",
                desc: "Complete A-Z path for React, styling, and web core.",
                tag: "Must Do",
                tagColor: "bg-red-500/10 text-red-400 border-red-500/20",
                icon: LayoutDashboard,
                color: "from-blue-500/20 to-cyan-500/5",
                borderColor: "hover:border-blue-500/50",
                stats: "120+ Problems"
              },
              {
                title: "DSA & Algorithmic Track",
                desc: "Blind 75 & Top interview questions mapped out logically.",
                tag: "Popular",
                tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                icon: Cpu,
                color: "from-orange-500/20 to-amber-500/5",
                borderColor: "hover:border-orange-500/50",
                stats: "450+ Problems"
              },
              {
                title: "System Design Blueprint",
                desc: "Real-world architectures analyzed and broken down.",
                tag: "Advanced",
                tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                icon: Terminal,
                color: "from-purple-500/20 to-pink-500/5",
                borderColor: "hover:border-purple-500/50",
                stats: "30+ Case Studies"
              }
            ].map((card, i) => (
              <TiltCard key={i} tiltAmount={10}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`h-full bg-[#161B22]/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl ${card.borderColor} transition-colors group cursor-pointer`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} border border-white/5 flex items-center justify-center`}>
                      <card.icon className="w-6 h-6 text-slate-200 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border ${card.tagColor}`}>
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white text-slate-200 transition-colors">{card.title}</h3>
                  <p className="text-sm text-slate-400 mb-6">{card.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                    <span className="text-xs font-medium text-slate-500">{card.stats}</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* Interactive Floating Dashboard Preview Section */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Live Progress & Analytics</h2>
              <button className="text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1">
                View Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <TiltCard tiltAmount={5} className="w-full">
              <div className="relative rounded-2xl bg-[#161B22]/40 border border-slate-800/80 p-2 backdrop-blur-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/50 to-transparent z-10 pointer-events-none" />
                
                <div className="rounded-xl border border-slate-800/50 bg-[#0D1117] overflow-hidden relative">
                  {/* Dashboard Header Bar */}
                  <div className="h-10 bg-[#161B22] border-b border-slate-800/80 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                      <div className="w-3 h-3 rounded-full bg-slate-700" />
                    </div>
                    <div className="mx-auto px-4 py-1 bg-[#0D1117] rounded-md text-[10px] text-slate-500 border border-slate-800">
                      app.mentoriq.dev / learner
                    </div>
                  </div>
                  
                  {/* Dashboard Grid Mock */}
                  <div className="p-6 grid grid-cols-12 gap-4 h-[350px] relative z-0">
                    <div className="col-span-8 flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="flex-1 h-24 rounded-xl bg-slate-800/40 border border-slate-800/50 p-4">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 mb-3" />
                          <div className="h-2 w-1/2 bg-slate-700/50 rounded-full mb-2" />
                          <div className="h-2 w-1/3 bg-slate-700/50 rounded-full" />
                        </div>
                        <div className="flex-1 h-24 rounded-xl bg-slate-800/40 border border-slate-800/50 p-4">
                          <div className="w-8 h-8 rounded-full bg-orange-500/20 mb-3" />
                          <div className="h-2 w-1/2 bg-slate-700/50 rounded-full mb-2" />
                          <div className="h-2 w-1/3 bg-slate-700/50 rounded-full" />
                        </div>
                      </div>
                      <div className="flex-1 rounded-xl bg-slate-800/20 border border-slate-800/50 p-4">
                        <div className="h-4 w-1/4 bg-slate-700/50 rounded-full mb-6" />
                        <div className="space-y-3">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="flex gap-4 items-center">
                              <div className="w-6 h-6 rounded bg-slate-800/80" />
                              <div className="flex-1 h-2 bg-slate-700/30 rounded-full">
                                <div className="h-full bg-slate-600/50 rounded-full" style={{width: `${Math.random() * 80 + 20}%`}} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 rounded-xl bg-slate-800/30 border border-slate-800/50 p-4 flex flex-col">
                      <div className="h-4 w-1/2 bg-slate-700/50 rounded-full mb-4" />
                      <div className="flex-1 rounded-lg bg-slate-800/40 mb-3" />
                      <div className="h-10 rounded-lg bg-orange-500/20 border border-orange-500/20 flex items-center justify-center mt-auto">
                        <div className="h-2 w-1/3 bg-orange-500/50 rounded-full" />
                      </div>
                    </div>

                    {/* Floating Overlay Element using Framer Motion */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-[20%] left-[30%] w-64 bg-slate-800/90 backdrop-blur-lg border border-slate-600/50 rounded-xl p-4 shadow-2xl z-20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Alex (Mentor)</p>
                          <p className="text-[10px] text-green-400">Typing a review...</p>
                        </div>
                      </div>
                      <div className="h-2 w-3/4 bg-slate-700 rounded-full mb-2" />
                      <div className="h-2 w-1/2 bg-slate-700 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </main>

      {/* Right Sidebar - Tools & Status (like TUF) */}
      <aside className="hidden xl:flex flex-col w-72 h-full border-l border-slate-800/60 bg-[#0D1117] p-6 sticky top-0 shrink-0">
        <div className="bg-[#161B22]/80 border border-slate-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-sm">Daily Goal</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-orange-600 to-amber-500" 
            />
          </div>
          <p className="text-xs text-slate-400">2 more problems to hit your streak!</p>
        </div>

        <h3 className="text-sm font-semibold tracking-wide text-slate-300 mb-4 px-1">Top Mentors Online Focus</h3>
        <div className="space-y-3">
          {[
            { tag: "Frontend", name: "Sarah M.", tagColor: "bg-blue-500/10 text-blue-400", time: "2m ago" },
            { tag: "Backend", name: "James K.", tagColor: "bg-emerald-500/10 text-emerald-400", time: "Online" },
            { tag: "DSA", name: "Ravi T.", tagColor: "bg-purple-500/10 text-purple-400", time: "1h ago" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#161B22]/50 p-2.5 rounded-lg border border-slate-800/50 hover:border-slate-700 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <User className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-200 font-medium leading-tight">{m.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${m.tagColor}`}>{m.tag}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">{m.time}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] uppercase font-bold bg-indigo-500 text-white px-1.5 py-0.5 rounded">Pro</span>
          </div>
          <p className="text-sm font-medium text-white mb-1">Upgrade to Premium</p>
          <p className="text-xs text-indigo-200/70 mb-3">Unlimited mock interviews & system design reviews.</p>
          <button className="w-full text-xs py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded transition-colors">
            View Plans
          </button>
        </div>
      </aside>

    </div>
  );
}