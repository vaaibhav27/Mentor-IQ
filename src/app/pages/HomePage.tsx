import { useState, useMemo } from "react";
import { useOutletContext } from "react-router";
import { 
  Users, Lock, ChevronRight, Cpu, Layout, Code2, 
  Database, ShieldCheck, Sparkles, Target, Settings, BrainCircuit, Globe, Palette 
} from "lucide-react";

// Track Configuration based on User Skills
const getTrackConfig = (skill: string, level: string) => {
  const s = skill.toLowerCase();
  
  // MACHINE LEARNING TRACK
  if (s.includes('machine learning') || s.includes('ml') || s.includes('ai') || s.includes('data')) {
    return {
      title: "Master Machine Learning Today",
      subtitle: `Jump into advanced predictive modeling natively tailored to your ${level} proficiency.`,
      bannerGradient: "from-blue-900 to-indigo-900",
      bannerImage: "/dsa_banner.png", // reusing this as fallback or we can remove the image and rely on gradients if we want
      categories: [
        { name: "Neural Networks", color: "bg-blue-500", icon: <BrainCircuit className="w-12 h-12 text-white/90" /> },
        { name: "Data Processing", color: "bg-teal-500", icon: <Database className="w-12 h-12 text-white/90" /> },
        { name: "Model Deployment", color: "bg-indigo-500", icon: <Cpu className="w-12 h-12 text-white/90" /> }
      ],
      sheetsTitle: "ML Roadmaps",
      sheets: [
        { title: "Deep Learning Foundations", desc: "Backpropagation, CNNs, and LSTMs.", btnColor: "bg-[#3B82F6]" },
        { title: "NLP Specialization", desc: "Transformers, Attention Mechanisms, LLMs.", btnColor: "bg-[#3B82F6]" },
        { title: "Kaggle Grandmaster", desc: "Feature Engineering and Ensembling.", btnColor: "bg-[#3B82F6]" }
      ],
      coreSubjectsTitle: "Mathematics & Theory",
      coreSubjects: [
        { title: "Linear Algebra", desc: "Matrices, Vectors, and Eigenvalues", hex: "#6366F1" },
        { title: "Probability & Stats", desc: "Distributions and Bayesian Theory", hex: "#6366F1" },
        { title: "Calculus", desc: "Derivatives, Gradients, and Optimization", hex: "#6366F1" }
      ],
      progressText: "ML Progress",
      mentors: [
        { name: "Dr. Andrew Ng", role: "AI Visionary", level: "Expert", avatarGroup: "from-blue-500 to-indigo-600" },
        { name: "Sarah Chen", role: "Sr. Data Scientist", level: "Advanced", avatarGroup: "from-teal-400 to-blue-500" }
      ]
    };
  }

  // UI/UX DESIGN TRACK
  if (s.includes('ui') || s.includes('ux') || s.includes('design') || s.includes('figma')) {
    return {
      title: "Master UI/UX Design Today",
      subtitle: `Elevate your design thinking and visual aesthetics for your ${level} journey.`,
      bannerGradient: "from-pink-900 to-rose-900",
      bannerImage: "", // pure gradient looks premium
      categories: [
        { name: "Wireframing", color: "bg-pink-500", icon: <Layout className="w-12 h-12 text-white/90" /> },
        { name: "Color Theory", color: "bg-rose-400", icon: <Palette className="w-12 h-12 text-white/90" /> },
        { name: "Prototyping", color: "bg-fuchsia-500", icon: <Sparkles className="w-12 h-12 text-white/90" /> }
      ],
      sheetsTitle: "Design Roadmaps",
      sheets: [
        { title: "Figma Mastery", desc: "Auto-layout, Components, and Variables.", btnColor: "bg-[#EC4899]" },
        { title: "User Research", desc: "Interviews, Personas, and Empathy Mapping.", btnColor: "bg-[#EC4899]" },
        { title: "Web Accessibility", desc: "WCAG Guidelines and Inclusive Design.", btnColor: "bg-[#EC4899]" }
      ],
      coreSubjectsTitle: "Core UX Principles",
      coreSubjects: [
        { title: "Information Arch.", desc: "Structuring and Organizing content", hex: "#F43F5E" },
        { title: "Interaction Design", desc: "Micro-interactions and state transitions", hex: "#F43F5E" },
        { title: "Usability Testing", desc: "A/B Testing and Heuristics", hex: "#F43F5E" }
      ],
      progressText: "Design Progress",
      mentors: [
        { name: "Julie Zhuo", role: "Design Leadership", level: "Expert", avatarGroup: "from-pink-500 to-rose-500" },
        { name: "Pablo Stanley", role: "Product Designer", level: "Advanced", avatarGroup: "from-fuchsia-500 to-pink-600" }
      ]
    };
  }

  // JAVA / FULL STACK TRACK
  if (s.includes('java') || s.includes('spring') || s.includes('backend') || s.includes('web')) {
    return {
      title: `Master ${s.includes('java') ? 'Java' : 'Web Dev'} Today`,
      subtitle: `Build scalable systems and high-performance applications at the ${level} level.`,
      bannerGradient: "from-emerald-900 to-teal-900",
      bannerImage: "",
      categories: [
        { name: "System Design", color: "bg-emerald-500", icon: <Settings className="w-12 h-12 text-white/90" /> },
        { name: "Microservices", color: "bg-teal-500", icon: <Globe className="w-12 h-12 text-white/90" /> },
        { name: "APIs & Databases", color: "bg-cyan-600", icon: <Database className="w-12 h-12 text-white/90" /> }
      ],
      sheetsTitle: "Architecture Roadmaps",
      sheets: [
        { title: "Advanced Spring Boot", desc: "Security, ORM, and Resiliency.", btnColor: "bg-[#10B981]" },
        { title: "High Level Design", desc: "Scaling systems to millions of users.", btnColor: "bg-[#10B981]" },
        { title: "Concurrency & Multi-threading", desc: "Master parallel execution.", btnColor: "bg-[#10B981]" }
      ],
      coreSubjectsTitle: "Core Engineering",
      coreSubjects: [
        { title: "Networking", desc: "TCP/IP, HTTP/2, and WebSockets", hex: "#14B8A6" },
        { title: "Operating Systems", desc: "Threads, Memory, and Processes", hex: "#14B8A6" },
        { title: "Databases (SQL/NoSQL)", desc: "ACID, Indexing, and Sharding", hex: "#14B8A6" }
      ],
      progressText: "Dev Progress",
      mentors: [
        { name: "Martin Fowler", role: "Software Architect", level: "Expert", avatarGroup: "from-emerald-500 to-teal-500" },
        { name: "Alex Xu", role: "System Design Lead", level: "Advanced", avatarGroup: "from-teal-500 to-cyan-600" }
      ]
    };
  }

  // DEFAULT / FALLBACK (DSA)
  return {
    title: "Master DSA Today",
    subtitle: `Start your structured programming journey with high-quality curated sheets. Defaulting to ${level}.`,
    bannerGradient: "from-orange-900 to-amber-900",
    bannerImage: "/dsa_banner.png",
    categories: [
      { name: "DSA Sheets", color: "bg-[#DDAE9A]", icon: <Code2 className="w-12 h-12 text-white/90" /> },
      { name: "Interview Experience", color: "bg-[#8FCFAD]", icon: <Users className="w-12 h-12 text-white/90" /> },
      { name: "Core CS Subjects", color: "bg-[#B0A3EE]", icon: <Layout className="w-12 h-12 text-white/90" /> }
    ],
    sheetsTitle: "DSA Sheets",
    sheets: [
      { title: "A2Z Sheet", desc: "Master DSA from Basics to Advanced", btnColor: "bg-[#E44D26]" },
      { title: "Blind 75 Sheet", desc: "Interview Problems with Video Solutions", btnColor: "bg-[#E44D26]" },
      { title: "SDE Sheet", desc: "Most Frequently Asked Interview Questions", btnColor: "bg-[#E44D26]" }
    ],
    coreSubjectsTitle: "Core CS Subjects",
    coreSubjects: [
      { title: "CN Sheet", desc: "Most Asked Computer Networks Interview Questions", hex: "#B0A3EE" },
      { title: "DBMS Sheet", desc: "Most Asked DBMS Interview Questions", hex: "#B0A3EE" },
      { title: "OS Sheet", desc: "Most Asked Operating System Interview Questions", hex: "#B0A3EE" }
    ],
    progressText: "DSA Progress",
    mentors: [
      { name: "Striver", role: "DSA Specialist", level: "Expert", avatarGroup: "from-amber-400 to-orange-500" },
      { name: "Alice Hacker", role: "Competitive Programmer", level: "Advanced", avatarGroup: "from-orange-500 to-red-500" }
    ]
  };
};

export default function HomePage() {
  const { profile } = useOutletContext<any>() || {};
  
  // Safely extract the primary skill and level from the context profile
  const userSkills = profile?.skills || [];
  const primarySkill = userSkills[0] || "DSA";
  const userLevel = profile?.level || "Beginner";
  
  // Get track dynamically
  const track = useMemo(() => getTrackConfig(primarySkill, userLevel), [primarySkill, userLevel]);

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* LEFT CONTENT COLUMN */}
      <div className="flex-1 space-y-10">
        
        {/* PROMO BANNER dynamically flavored */}
        <div className={`w-full h-40 md:h-56 rounded-2xl overflow-hidden relative border border-slate-800 shadow-xl group cursor-pointer bg-gradient-to-r ${track.bannerGradient}`}>
           {track.bannerImage && (
             <img src={track.bannerImage} alt="Learn" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 mix-blend-overlay" />
           )}
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-12 backdrop-blur-[2px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full w-fit mb-3 backdrop-blur-md">
                 <ShieldCheck className="w-4 h-4 text-green-400" />
                 <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">{userLevel} Track Verified</span>
              </div>
              <h2 className="text-white text-2xl md:text-4xl font-extrabold mb-2">{track.title}</h2>
              <p className="text-slate-300 text-sm md:text-base font-medium max-w-lg">{track.subtitle}</p>
           </div>
        </div>

        {/* CATEGORIES SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6 px-1">
             <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Categories</h2>
             <button className="text-slate-400 hover:text-slate-200 transition-colors">
               <Users className="w-5 h-5" />
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             {track.categories.map((cat: any, idx: number) => (
               <div key={idx} className="bg-[#1C2128] rounded-[24px] p-6 pb-8 flex flex-col items-center justify-center text-center gap-5 hover:bg-[#22272E] cursor-pointer transition-all border border-transparent hover:border-slate-700/50 group">
                  <div className={`w-full h-[90px] ${cat.color} rounded-[32px] flex items-center justify-center text-white shadow-inner group-hover:-translate-y-1 transition-transform`}>
                     {cat.icon}
                  </div>
                  <span className="font-bold text-slate-200 text-lg">{cat.name}</span>
               </div>
             ))}
          </div>
        </section>

        {/* SHEETS/ROADMAPS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{track.sheetsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             {track.sheets.map((sheet: any, idx: number) => (
                <div key={idx} className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80 group">
                   <div className={`border-l-4 pl-4 py-1 mb-4`} style={{ borderColor: sheet.btnColor }}>
                     <h3 className="font-bold text-white text-[15px] mb-1">{sheet.title}</h3>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed min-h-[32px]">{sheet.desc}</p>
                   </div>
                   <div className="flex gap-3 mt-auto pt-2">
                     <button className="flex-1 py-2.5 font-bold text-xs rounded-xl transition-colors hover:scale-[1.02]" style={{ backgroundColor: sheet.btnColor + '20', color: sheet.btnColor }}>Explore</button>
                     <button className="flex-1 py-2.5 font-bold text-xs rounded-xl transition-colors hover:scale-[1.02]" style={{ backgroundColor: sheet.btnColor + '20', color: sheet.btnColor }}>Track Progress</button>
                   </div>
                </div>
             ))}
          </div>
        </section>

        {/* CORE SUBJECTS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{track.coreSubjectsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             {track.coreSubjects.map((subject: any, idx: number) => (
                <div key={idx} className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80 group">
                   <div className="border-l-4 pl-4 py-1 mb-4" style={{ borderColor: subject.hex }}>
                     <h3 className="font-bold text-white text-[15px] mb-1">{subject.title}</h3>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed">{subject.desc}</p>
                   </div>
                   <div className="flex gap-3 mt-auto pt-2">
                     <button className="flex-1 py-2.5 font-bold text-xs rounded-xl transition-colors hover:bg-slate-700" style={{ backgroundColor: subject.hex + '15', color: subject.hex }}>Start Learning</button>
                   </div>
                </div>
             ))}
          </div>
        </section>

      </div>

      {/* RIGHT SIDEBAR COLUMN */}
      <div className="w-full xl:w-[340px] shrink-0 flex flex-col gap-5 pt-1">
        
        {/* Dynamic Progress Card */}
        <div className="bg-[#161B22] border border-slate-800/60 rounded-[24px] p-6 px-10 shadow-lg">
           <div className="flex items-center justify-center mb-8">
             <div className="px-5 py-2 bg-white/5 rounded-full text-[13px] font-bold text-slate-200 border border-white/5 tracking-wide backdrop-blur-sm">
               {track.progressText}
             </div>
           </div>
           
           <div className="flex flex-col xl:flex-row items-center gap-8 justify-between">
             {/* Donut Chart Visual mock */}
             <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center">
               <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                  <circle cx="55" cy="55" r="45" stroke="#1C2128" strokeWidth="8" fill="none" />
                  <circle cx="55" cy="55" r="45" stroke="#F87171" strokeWidth="8" fill="none" strokeDasharray="282.7" strokeDashoffset="240" className="transition-all duration-1000" />
                  <circle cx="55" cy="55" r="45" stroke="#FBBF24" strokeWidth="8" fill="none" strokeDasharray="282.7" strokeDashoffset="180" className="rotate-[45deg] origin-center transition-all duration-1000 delay-300" />
                  <circle cx="55" cy="55" r="45" stroke="#34D399" strokeWidth="8" fill="none" strokeDasharray="282.7" strokeDashoffset="120" className="rotate-[120deg] origin-center transition-all duration-1000 delay-500" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="text-[26px] font-bold text-white leading-none tracking-tight">12</div>
                 <div className="text-[12px] font-medium text-slate-400 mt-1">Units</div>
               </div>
             </div>

             {/* Legend */}
             <div className="flex flex-col gap-3 font-medium flex-1 w-full">
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> Basic
                  </div>
                  <span className="text-slate-300 ml-3">5</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> Interm.
                  </div>
                  <span className="text-slate-300 ml-3">4</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]" /> Adv.
                  </div>
                  <span className="text-slate-300 ml-3">3</span>
                </div>
             </div>
           </div>
        </div>

        {/* Dynamic Matched Mentors specifically for user skills */}
        <div className="bg-gradient-to-b from-[#1C2128] to-[#161B22] border border-slate-700/50 rounded-[24px] p-5 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24 text-white" />
           </div>
           <h3 className="font-bold text-slate-100 flex items-center gap-2 mb-4 relative z-10">
             <Sparkles className="w-4 h-4 text-orange-400" />
             Mentor Matches
           </h3>
           <p className="text-xs text-slate-400 mb-4 relative z-10">
             Top experts who teach <span className="text-white font-semibold uppercase">{primarySkill}</span> at the <span className="text-orange-400 font-semibold uppercase">{userLevel}</span> level.
           </p>

           <div className="space-y-3 relative z-10">
             {track.mentors.map((mentor: any, idx: number) => (
               <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 cursor-pointer transition-colors group">
                 <div className={`w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white shadow-inner ${mentor.avatarGroup}`}>
                   {mentor.name.charAt(0)}
                 </div>
                 <div className="flex-1">
                   <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{mentor.name}</div>
                   <div className="text-[11px] text-slate-400">{mentor.role}</div>
                 </div>
                 <div className="px-2 py-1 bg-[#161B22] border border-slate-700 rounded-md text-[9px] font-bold text-orange-400">
                   {mentor.level}
                 </div>
               </div>
             ))}
           </div>
           
           <button className="w-full mt-4 py-2 border border-dashed border-slate-600 rounded-lg text-slate-400 text-xs font-semibold hover:border-orange-500 hover:text-orange-400 transition-colors">
              Find More Matches
           </button>
        </div>
        
        {/* Helper Navigation Buttons */}
        <div className="flex items-center justify-between p-4 px-5 bg-white/[0.02] border border-slate-800/60 rounded-[20px] hover:bg-white/[0.04] cursor-pointer transition-colors group mt-2">
           <span className="text-[13px] font-bold text-slate-300 group-hover:text-white transition-colors">Calendar + Roadmap</span>
           <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
             <Lock className="w-3.5 h-3.5 text-orange-400" />
           </div>
        </div>

        {/* SOLID PHOTO QUOTE CARD (Retained as Fallback aesthetic) */}
        <div className="rounded-[24px] overflow-hidden border border-slate-800/60 h-[350px] relative mt-1 group shrink-0">
           <img src="/quote_card.png" alt="Quote" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 p-6 flex flex-col pt-10">
              <div className="text-[32px] text-white/40 leading-none absolute top-6 left-6 font-serif">"</div>
              <div className="text-2xl font-bold text-white leading-[1.3] mt-2 relative z-10 px-2 tracking-tight">
                 Keep pushing<br/>
                 your limits.<br/>
                 The only way<br/>
                 is up
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
