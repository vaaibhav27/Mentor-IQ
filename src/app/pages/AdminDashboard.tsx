import { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  Ghost, 
  Clock, 
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Award
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { TiltCard } from "../components/ui/TiltCard";

const stateData = [
  { name: 'Active', value: 450, color: '#22c55e' },
  { name: 'Completed', value: 300, color: '#3b82f6' },
  { name: 'Awaiting Response', value: 120, color: '#f59e0b' },
  { name: 'Inactive/Stalled', value: 80, color: '#ef4444' },
];

const trendData = [
  { month: 'Jan', dropoff: 15, ghost: 8 },
  { month: 'Feb', dropoff: 12, ghost: 7 },
  { month: 'Mar', dropoff: 18, ghost: 10 },
  { month: 'Apr', dropoff: 10, ghost: 4 },
  { month: 'May', dropoff: 8, ghost: 3 },
  { month: 'Jun', dropoff: 5, ghost: 2 },
];

export default function AdminDashboard() {
  const stats = [
    { label: "Platform Ghost Rate", value: "4.2%", icon: Ghost, trend: "-1.8%", trendColor: "text-green-400", color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Drop-off Rate", value: "8.5%", icon: Activity, trend: "-2.1%", trendColor: "text-green-400", color: "text-red-500", bg: "bg-red-500/10" },
    { label: "At-Risk Learners", value: "142", icon: AlertTriangle, trend: "+12", trendColor: "text-red-400", color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "SLA Violations", value: "24", icon: Clock, trend: "-5", trendColor: "text-green-400", color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">Admin Intelligence Center</h1>
          <p className="text-slate-400">Platform-wide oversight for <span className="text-orange-400 font-medium">Mentorship Analytics & Health</span>.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-[#161B22] border border-slate-700/80 hover:bg-slate-800 text-slate-300 rounded-lg transition-all font-medium">
             Export Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <TiltCard key={idx} tiltAmount={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#161B22]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.bg} border border-white/5 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.trendColor} bg-slate-900/50 px-2 py-1 rounded-md`}>
                  {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="text-slate-400 text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-2xl font-extrabold text-slate-100">{stat.value}</div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Mentorship State Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-slate-100 mb-6">Mentorship State Distribution</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {stateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D1117', border: '1px solid #1e293b', borderRadius: '8px', color: '#f1f5f9' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-extrabold text-white">950</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Active</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {stateData.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-slate-400 font-medium">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform Health Trends */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-100">Negative Behaviour Trends (Ghosting & Drop-offs)</h3>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161B22', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="dropoff" name="Drop-off Rate" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="ghost" name="Ghost Rate" stroke="#9333ea" strokeWidth={3} dot={{ fill: '#9333ea', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Mentors Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" /> Platform Leaderboard</h3>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Top Reliability</span>
          </div>
          <div className="space-y-4">
            {[
              { rank: 1, name: "Priya Patel", score: 99, stats: "142 sessions" },
              { rank: 2, name: "Dr. Sarah Chen", score: 98, stats: "110 sessions" },
              { rank: 3, name: "Marcus Thorne", score: 97, stats: "89 sessions" },
              { rank: 4, name: "Jordan Smith", score: 95, stats: "210 sessions" },
            ].map((m) => (
              <div key={m.rank} className="flex items-center gap-4 bg-[#0D1117] p-4 rounded-xl border border-slate-800/60">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${m.rank === 1 ? 'bg-yellow-500 text-yellow-900' : m.rank === 2 ? 'bg-slate-300 text-slate-800' : m.rank === 3 ? 'bg-amber-600 text-amber-100' : 'bg-slate-800 text-slate-400'}`}>
                  #{m.rank}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-200">{m.name}</div>
                  <div className="text-xs text-slate-500">{m.stats}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-orange-400">{m.score}/100</div>
                  <div className="text-[9px] uppercase font-bold text-slate-600 mt-0.5">MentorScore</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SLA Violation Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#161B22]/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 h-full"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-400" /> Recent SLA Auto-Flagging</h3>
            <button className="text-orange-400 text-xs font-semibold hover:text-orange-300">View All Log</button>
          </div>
          <div className="space-y-4">
            {[
              { time: "2h ago", event: "AWAITING_FIRST_RESPONSE Breach", details: "Mentor ID #8921 failed 24h SLA. State shifted.", action: "Reliability -0.2" },
              { time: "5h ago", event: "STALLED State Triggered", details: "72h inactivity between Learner #912 & Mentor #11", action: "Nudge Email Sent" },
              { time: "1d ago", event: "INACTIVE State Triggered", details: "7 days no response.", action: "Admin Escalation" },
            ].map((log, idx) => (
              <div key={idx} className="p-4 bg-[#0D1117]/80 rounded-xl border border-red-500/10 border-l-2 border-l-red-500 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-bold text-slate-200">{log.event}</div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{log.time}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{log.details}</p>
                <div className="inline-block px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded">
                  System Action: {log.action}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
}
