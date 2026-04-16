import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, ArrowRight, Loader2, Sparkles, BookOpen, Clock, Code, Award, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { toast } from "sonner";

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

export default function OnboardingPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Onboarding state
  const [skills, setSkills] = useState("");
  const [masteryGoals, setMasteryGoals] = useState("");
  const [level, setLevel] = useState("beginner");
  const [experienceYears, setExperienceYears] = useState("1-3 years");
  const [availability, setAvailability] = useState("2-4 hours/week");

  useEffect(() => {
    function fetchProfile() {
      const mockSession = localStorage.getItem("mockSession");
      const mockProfile = localStorage.getItem("mockProfile");

      if (!mockSession || !mockProfile) {
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        const data = JSON.parse(mockProfile);
        setProfile(data);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleFinish = async () => {
    setSaving(true);
    
    try {
      setTimeout(() => {
        const updatedProfile = {
          ...profile,
          onboarded: true,
          ...(profile.role === 'mentor' 
            ? { skills: skills.split(",").map(s => s.trim()), experience: experienceYears, availability }
            : { skills: skills.split(",").map(s => s.trim()), goals: masteryGoals.split(",").map(s => s.trim()), level }
          )
        };

        localStorage.setItem("mockProfile", JSON.stringify(updatedProfile));
        toast.success("Profile completed! Redirecting to dashboard...");
        navigate(`/dashboard/${profile.role}`);
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const isMentor = profile?.role === 'mentor';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-slate-950 to-purple-500/10" />
      
      <div className="relative w-full max-w-2xl">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-2">
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-800'}`} 
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {step} of 2</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 text-blue-400 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Getting Started</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Tell us about your <span className="text-blue-500">expertise</span>
                  </h1>
                  <p className="text-slate-400">This helps us match you with the right {isMentor ? "learners" : "mentors"}.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {isMentor ? "What are your core skills?" : "What skills do you already have?"}
                    </label>
                    <div className="relative">
                      <Code className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                      <textarea
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        placeholder="e.g. React, TypeScript, Node.js, UI/UX Design..."
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Separate skills with commas</p>
                  </div>

                  {!isMentor && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        What skills do you want to master?
                      </label>
                      <div className="relative">
                        <Target className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                        <textarea
                          value={masteryGoals}
                          onChange={(e) => setMasteryGoals(e.target.value)}
                          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                          placeholder="e.g. Advanced System Design, Leadership, Cloud Architecture..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!skills.trim()}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-8"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 text-blue-400 mb-2">
                    <Award className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Almost There</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Experience & <span className="text-blue-500">Commitment</span>
                  </h1>
                  <p className="text-slate-400">Let's set the right expectations for your mentorship journey.</p>
                </div>

                <div className="space-y-6">
                  {isMentor ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Professional Experience</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["1-3 years", "3-5 years", "5-10 years", "10+ years"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setExperienceYears(opt)}
                              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                experienceYears === opt 
                                  ? "border-blue-500 bg-blue-500/10 text-white" 
                                  : "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Weekly Availability</label>
                        <div className="grid grid-cols-2 gap-3">
                          {["1-2 hours", "2-4 hours", "5-8 hours", "10+ hours"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setAvailability(opt)}
                              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                availability === opt 
                                  ? "border-blue-500 bg-blue-500/10 text-white" 
                                  : "border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700"
                              }`}
                            >
                              {opt}/week
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Your Current Proficiency Level</label>
                      <div className="grid gap-3">
                        {[
                          { id: "beginner", label: "Beginner", desc: "Just starting out in this field" },
                          { id: "intermediate", label: "Intermediate", desc: "Have some professional experience" },
                          { id: "advanced", label: "Advanced", desc: "Looking to polish expert-level skills" }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setLevel(opt.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                              level === opt.id 
                                ? "border-blue-500 bg-blue-500/10" 
                                : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              level === opt.id ? "border-blue-500 bg-blue-500" : "border-slate-700"
                            }`}>
                              {level === opt.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                            <div>
                              <div className={`font-bold ${level === opt.id ? "text-white" : "text-slate-300"}`}>{opt.label}</div>
                              <div className="text-xs text-slate-500">{opt.desc}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-slate-700 text-slate-300 font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinish}
                    disabled={saving}
                    className="flex-[2] bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20"
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Complete Profile
                        <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}