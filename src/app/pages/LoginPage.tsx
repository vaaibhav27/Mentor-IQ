import { useState } from "react";
import { motion } from "motion/react";
import { Target, ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // MOCK AUTHENTICATION TO ENSURE APP WORKS OFFLINE/FRONTEND-ONLY
      setTimeout(() => {
        const storedProfile = localStorage.getItem("mockProfile");
        if (storedProfile) {
          const profile = JSON.parse(storedProfile);
          toast.success("Welcome back!");
          navigate(`/dashboard/home`);
        } else {
          // If no profile, mock a learner login
          const mockSession = { access_token: "mock_token_123" };
          const mockProfile = { name: "Demo Learner", email, role: "learner", onboarded: true };
          localStorage.setItem("mockSession", JSON.stringify(mockSession));
          localStorage.setItem("mockProfile", JSON.stringify(mockProfile));
          toast.success("Welcome back!");
          navigate("/dashboard/home");
        }
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Failed to login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <div className="bg-[#111823] border border-[#1E293B] rounded-[20px] p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">MentorIQ</span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-sm text-slate-400">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0F15] border border-slate-800 text-white text-sm rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B0F15] border border-slate-800 text-white text-sm rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}