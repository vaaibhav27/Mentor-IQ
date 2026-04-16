import { useState } from "react";
import { motion } from "motion/react";
import { Target, ArrowRight, Loader2, Mail, Lock, User, Briefcase, GraduationCap } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "learner";
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(initialRole);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // MOCK AUTHENTICATION TO ENSURE APP WORKS OFFLINE/FRONTEND-ONLY
      setTimeout(() => {
        const mockSession = {
          access_token: "mock_token_123",
          user: { id: "123", email, role }
        };
        const mockProfile = {
          id: "123",
          name: name || "Demo User",
          email,
          role,
          onboarded: true
        };
        
        localStorage.setItem("mockSession", JSON.stringify(mockSession));
        localStorage.setItem("mockProfile", JSON.stringify(mockProfile));

        toast.success("Account created successfully!");
        navigate(`/dashboard/${role}`);
      }, 1000);
      
    } catch (err: any) {
      toast.error(err.message || "Failed to create account");
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
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Create your account</h1>
            <p className="text-sm text-slate-400">Join the structured mentorship intelligence platform</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              onClick={() => setRole("learner")}
              className={`pt-4 pb-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === "learner"
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              <GraduationCap className={`w-6 h-6 ${role === "learner" ? "text-blue-400" : ""}`} />
              <span className="font-semibold uppercase tracking-widest text-[10px]">Learner</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("mentor")}
              className={`pt-4 pb-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === "mentor"
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              <Briefcase className={`w-6 h-6 ${role === "mentor" ? "text-blue-400" : ""}`} />
              <span className="font-semibold uppercase tracking-widest text-[10px]">Mentor</span>
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B0F15] border border-slate-800 text-white text-sm rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                  placeholder="Your full name"
                />
              </div>
            </div>

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

            <p className="text-[10px] text-slate-500 text-center px-4 pt-1 pb-1">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}