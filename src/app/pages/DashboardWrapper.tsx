import { useState, useEffect } from "react";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { 
  Target, 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Search, 
  Settings, 
  LogOut, 
  Loader2,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

export default function DashboardWrapper() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      // Offline / Local Mock Auth Support
      const mockSession = localStorage.getItem("mockSession");
      const mockProfile = localStorage.getItem("mockProfile");

      if (!mockSession || !mockProfile) {
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const data = JSON.parse(mockProfile);
        
        if (!data.onboarded) {
          navigate("/onboarding");
          return;
        }

        setProfile(data);
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("mockSession");
    localStorage.removeItem("mockProfile");
    navigate("/");
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  // Redirect to the correct overview if the base /dashboard path is accessed
  if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
    return <Navigate to="/dashboard/home" replace />;
  }

  const menuItems = [
    { 
      label: "Home", 
      icon: LayoutDashboard, 
      path: profile.role === 'mentor' ? `/dashboard/mentor` : `/dashboard/home`,
      active: location.pathname === "/dashboard/home" || location.pathname === `/dashboard/${profile.role}`
    },
    { 
      label: profile.role === 'mentor' ? "Mentees" : "My Mentors", 
      icon: Users, 
      path: "/dashboard/mentors", 
      active: location.pathname === "/dashboard/mentors"
    },
    { 
      label: "Messages", 
      icon: MessageSquare, 
      path: "/dashboard/chat",
      active: location.pathname.startsWith("/dashboard/chat")
    },
    { 
      label: "Find Mentors", 
      icon: Search, 
      path: "/dashboard/marketplace",
      active: location.pathname === "/dashboard/marketplace",
      hidden: profile.role === 'mentor'
    },
    { 
      label: "Admin Panel", 
      icon: Settings, 
      path: "/dashboard/admin",
      active: location.pathname === "/dashboard/admin",
      hidden: profile.role !== 'admin' && profile.role !== 'mentor' // Showing to mentor for demo purpose if needed
    },
  ].filter(item => !item.hidden);

  return (
    <div className="flex h-screen bg-[#0D1117] text-slate-200 overflow-hidden font-sans">
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center shadow-orange-500/20"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className={`bg-[#161B22]/80 backdrop-blur-xl border-r border-slate-800/60 flex flex-col z-40 transition-all shrink-0 ${isSidebarOpen ? 'px-4 py-6' : 'p-0 overflow-hidden'}`}
      >
        <div className="flex items-center gap-3 px-2 mb-10 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-xl flex items-center justify-center p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0D1117] rounded-[10px] flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">MentorIQ</span>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                item.active 
                  ? "bg-[#161B22] border border-slate-700/50 text-orange-400 shadow-sm font-medium" 
                  : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
              }`}
            >
              <item.icon className={`w-4 h-4 transition-colors ${item.active ? "text-orange-400" : "group-hover:text-slate-200"}`} />
              <span className="text-sm">{item.label}</span>
              {item.active && <ChevronRight className="w-4 h-4 ml-auto opacity-50 text-orange-400" />}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-white uppercase shadow-inner shadow-white/20 text-sm">
              {profile?.name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{profile?.name}</div>
              <div className="text-xs text-slate-500 truncate capitalize">{profile?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-slate-800/60 flex items-center justify-between px-8 bg-[#0D1117]/80 backdrop-blur-xl z-30">
          <h2 className="text-lg font-bold text-slate-100 tracking-tight">
            {menuItems.find(i => i.active)?.label || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
             {/* Notification Bell, etc. */}
             <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold uppercase tracking-wider">
               Online
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0D1117] relative">
          <Outlet context={{ profile }} />
        </div>
      </main>
    </div>
  );
}