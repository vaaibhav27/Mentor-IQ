import { useState } from "react";
import { Users, Lock, ChevronRight, CheckCircle2, ChevronRightCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* LEFT CONTENT COLUMN */}
      <div className="flex-1 space-y-10">
        
        {/* PROMO BANNER (Requested image above DSA column) */}
        <div className="w-full h-40 md:h-56 rounded-2xl overflow-hidden relative border border-slate-800 shadow-xl group cursor-pointer">
           <img src="/dsa_banner.png" alt="Learn DSA" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-8 md:px-12">
              <h2 className="text-white text-2xl md:text-4xl font-extrabold mb-2">Master DSA Today</h2>
              <p className="text-slate-300 text-sm md:text-base font-medium max-w-md">Start your structured programming journey with high-quality curated sheets.</p>
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
             
             {/* Card 1: DSA Sheets */}
             <div className="bg-[#1C2128] rounded-[24px] p-6 pb-8 flex flex-col items-center justify-center text-center gap-5 hover:bg-[#22272E] cursor-pointer transition-all border border-transparent hover:border-slate-700/50 group">
                <div className="w-full h-[90px] bg-[#DDAE9A] rounded-[32px] flex items-center justify-center text-white shadow-inner group-hover:-translate-y-1 transition-transform">
                   <div className="grid grid-cols-2 gap-1 w-12 h-12">
                     {/* Cube Icon Mock */}
                     <div className="w-5 h-5 bg-white rounded flex items-center justify-center" />
                     <div className="w-5 h-5 bg-white rounded flex items-center justify-center" />
                     <div className="w-5 h-5 bg-white rounded flex items-center justify-center col-span-2 mx-auto" />
                   </div>
                </div>
                <span className="font-bold text-slate-200 text-lg">DSA Sheets</span>
             </div>

             {/* Card 2: Interview Experience */}
             <div className="bg-[#1C2128] rounded-[24px] p-6 pb-8 flex flex-col items-center justify-center text-center gap-5 hover:bg-[#22272E] cursor-pointer transition-all border border-transparent hover:border-slate-700/50 group">
                <div className="w-full h-[90px] bg-[#8FCFAD] rounded-[32px] flex items-center justify-center text-white shadow-inner group-hover:-translate-y-1 transition-transform relative">
                   {/* People Icon mock */}
                   <Users className="w-12 h-12 text-white" />
                </div>
                <span className="font-bold text-slate-200 text-lg">Interview Experience</span>
             </div>

             {/* Card 3: Core CS Subjects */}
             <div className="bg-[#1C2128] rounded-[24px] p-6 pb-8 flex flex-col items-center justify-center text-center gap-5 hover:bg-[#22272E] cursor-pointer transition-all border border-transparent hover:border-slate-700/50 group relative">
                <div className="w-full h-[90px] bg-[#B0A3EE] rounded-[32px] flex items-center justify-center text-white shadow-inner group-hover:-translate-y-1 transition-transform">
                   {/* Monitor icon mock */}
                   <div className="border-[3px] border-white w-12 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                      &lt;/&gt;
                   </div>
                </div>
                <span className="font-bold text-slate-200 text-lg">Core CS Subjects</span>
                <div className="absolute top-1/2 right-0 translate-x-1/2 w-8 h-8 bg-[#2D333B] rounded-full flex items-center justify-center border border-slate-700/50 z-10 shadow-lg">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
             </div>

          </div>
        </section>

        {/* DSA SHEETS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">DSA Sheets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             
             {/* Sheet Card 1 */}
             <div className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80 group">
                <div className="border-l-4 border-orange-500 pl-4 py-1 mb-4">
                  <h3 className="font-bold text-white text-[15px] mb-1">A2Z Sheet</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">Master DSA from Basics to Advanced</p>
                </div>
                <div className="flex gap-3 mt-auto pt-2">
                   <button className="flex-1 py-2.5 bg-[#E44D26]/10 text-[#E44D26] hover:bg-[#E44D26]/20 font-bold text-xs rounded-xl transition-colors">Sheet</button>
                   <button className="flex-1 py-2.5 bg-[#E44D26]/10 text-[#E44D26] hover:bg-[#E44D26]/20 font-bold text-xs rounded-xl transition-colors">Track</button>
                </div>
             </div>

             {/* Sheet Card 2 */}
             <div className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80 group">
                <div className="border-l-4 border-orange-500 pl-4 py-1 mb-4">
                  <h3 className="font-bold text-white text-[15px] mb-1">Blind 75 Sheet</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">Interview Problems with Video Solutions</p>
                </div>
                <div className="flex gap-3 mt-auto pt-2">
                   <button className="flex-1 py-2.5 bg-[#E44D26]/10 text-[#E44D26] hover:bg-[#E44D26]/20 font-bold text-xs rounded-xl transition-colors">Sheet</button>
                   <button className="flex-1 py-2.5 bg-[#E44D26]/10 text-[#E44D26] hover:bg-[#E44D26]/20 font-bold text-xs rounded-xl transition-colors">Track</button>
                </div>
             </div>

             {/* Sheet Card 3 */}
             <div className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80 group relative">
                <div className="border-l-4 border-orange-500 pl-4 py-1 mb-4">
                  <h3 className="font-bold text-white text-[15px] mb-1">SDE Sheet</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">Most Frequently Asked Interview Questions</p>
                </div>
                <div className="flex gap-3 mt-auto pt-2">
                   <button className="flex-1 py-2.5 bg-[#E44D26]/10 text-[#E44D26] hover:bg-[#E44D26]/20 font-bold text-xs rounded-xl transition-colors">Sheet</button>
                   <button className="flex-1 py-2.5 bg-[#E44D26]/10 text-[#E44D26] hover:bg-[#E44D26]/20 font-bold text-xs rounded-xl transition-colors">Track</button>
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 w-8 h-8 bg-[#2D333B] rounded-full flex items-center justify-center border border-slate-700/50 z-10 shadow-lg">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
             </div>

          </div>
        </section>

        {/* CORE CS SUBJECTS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Core Cs Subjects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             <div className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80">
                <div className="border-l-4 border-orange-500 pl-4 py-1 mb-4">
                  <h3 className="font-bold text-white text-[15px] mb-1">CN Sheet</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">Most Asked Computer Networks Interview Questions</p>
                </div>
                <div className="flex gap-3 mt-auto pt-2">
                   <button className="flex-1 py-2.5 bg-[#B0A3EE]/10 text-[#B0A3EE] hover:bg-[#B0A3EE]/20 font-bold text-xs rounded-xl transition-colors">Start Learning</button>
                </div>
             </div>
             <div className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80">
                <div className="border-l-4 border-orange-500 pl-4 py-1 mb-4">
                  <h3 className="font-bold text-white text-[15px] mb-1">DBMS Sheet</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">Most Asked DBMS Interview Questions</p>
                </div>
                <div className="flex gap-3 mt-auto pt-2">
                   <button className="flex-1 py-2.5 bg-[#B0A3EE]/10 text-[#B0A3EE] hover:bg-[#B0A3EE]/20 font-bold text-xs rounded-xl transition-colors">Start Learning</button>
                </div>
             </div>
             <div className="bg-[#1C2128] rounded-[20px] p-5 flex flex-col hover:bg-[#22272E] transition-all border border-slate-800/80">
                <div className="border-l-4 border-orange-500 pl-4 py-1 mb-4">
                  <h3 className="font-bold text-white text-[15px] mb-1">OS Sheet</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">Most Asked Operating System Interview Questions</p>
                </div>
                <div className="flex gap-3 mt-auto pt-2">
                   <button className="flex-1 py-2.5 bg-[#B0A3EE]/10 text-[#B0A3EE] hover:bg-[#B0A3EE]/20 font-bold text-xs rounded-xl transition-colors">Start Learning</button>
                </div>
             </div>
          </div>
        </section>

      </div>

      {/* RIGHT SIDEBAR COLUMN */}
      <div className="w-full xl:w-[340px] shrink-0 flex flex-col gap-5 pt-1">
        
        {/* DSA Progress Card */}
        <div className="bg-[#161B22] border border-slate-800/60 rounded-[24px] p-6 px-10 shadow-lg">
           <div className="flex items-center justify-center mb-8">
             <div className="px-5 py-2 bg-white/5 rounded-full text-[13px] font-bold text-slate-200 border border-white/5 tracking-wide backdrop-blur-sm">
               DSA Progress
             </div>
           </div>
           
           <div className="flex flex-col xl:flex-row items-center gap-8 justify-between">
             {/* Donut Chart Visual mock */}
             <div className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center">
               <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(234,88,12,0.3)]">
                  <circle cx="55" cy="55" r="45" stroke="#1C2128" strokeWidth="8" fill="none" />
                  <circle cx="55" cy="55" r="45" stroke="#F87171" strokeWidth="8" fill="none" strokeDasharray="282.7" strokeDashoffset="240" />
                  <circle cx="55" cy="55" r="45" stroke="#FBBF24" strokeWidth="8" fill="none" strokeDasharray="282.7" strokeDashoffset="180" className="rotate-[45deg] origin-center" />
                  <circle cx="55" cy="55" r="45" stroke="#34D399" strokeWidth="8" fill="none" strokeDasharray="282.7" strokeDashoffset="120" className="rotate-[120deg] origin-center" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="text-[26px] font-bold text-white leading-none tracking-tight">314</div>
                 <div className="text-[12px] font-medium text-slate-400 mt-1">1074</div>
               </div>
             </div>

             {/* Legend */}
             <div className="flex flex-col gap-3 font-medium flex-1 w-full">
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" /> Easy
                  </div>
                  <span className="text-slate-300 ml-3">100<span className="text-slate-500">/345</span></span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> Medium
                  </div>
                  <span className="text-slate-300 ml-3">131<span className="text-slate-500">/476</span></span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]" /> Hard
                  </div>
                  <span className="text-slate-300 ml-3">83<span className="text-slate-500">/253</span></span>
                </div>
             </div>
           </div>
        </div>
        
        {/* Helper Navigation Buttons */}
        <div className="flex items-center justify-between p-4 px-5 bg-white/[0.02] border border-slate-800/60 rounded-[20px] hover:bg-white/[0.04] cursor-pointer transition-colors group">
           <span className="text-[13px] font-bold text-slate-300 group-hover:text-white transition-colors">Calendar + Roadmap</span>
           <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
             <Lock className="w-3.5 h-3.5 text-orange-400" />
           </div>
        </div>

        {/* SOLID PHOTO QUOTE CARD (Requested exact design) */}
        <div className="rounded-[24px] overflow-hidden border border-slate-800/60 h-[420px] relative mt-1 group">
           {/* Replace this with our generated image */}
           <img src="/quote_card.png" alt="Quote" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 p-6 flex flex-col pt-10">
              <div className="text-[32px] text-white/40 leading-none absolute top-6 left-6 font-serif">"</div>
              <div className="text-2xl font-bold text-white leading-[1.3] mt-2 relative z-10 px-2 tracking-tight">
                 Life has no remote.<br/>
                 Get Up and<br/>
                 change it<br/>
                 yourself
              </div>
           </div>
        </div>

        {/* Extra helper nav for exact match */}
        <div className="flex items-center justify-between p-4 px-5 bg-white/[0.02] border border-slate-800/60 rounded-[20px] hover:bg-white/[0.04] cursor-pointer transition-colors group mt-1">
           <span className="text-[13px] font-bold text-slate-300 group-hover:text-white transition-colors">Sessions</span>
           <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
             <Lock className="w-3.5 h-3.5 text-orange-400" />
           </div>
        </div>
        
      </div>
    </div>
  );
}
