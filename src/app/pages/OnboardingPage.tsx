import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, ArrowRight, Loader2, Sparkles, Code, Award, CheckCircle2, Briefcase, Clock, Calendar, Sunrise, Moon, Building2, UserCircle, GraduationCap, Cpu, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// --- MOCK AI QUESTIONS ---
const ML_QUESTIONS = {
  beginner: [
    { q: "What is Machine Learning?", options: ["A type of AI", "A web browser", "A database", "A styling language"], answer: 0 },
    { q: "Which programming language is most popular for ML?", options: ["Java", "Python", "HTML", "C#"], answer: 1 },
    { q: "What is a dataset?", options: ["A collection of data", "An algorithm", "A cloud server", "A neural network"], answer: 0 },
    { q: "What does 'training' a model mean?", options: ["Making it exercise", "Feeding it data to learn patterns", "Deleting bad data", "Deploying to production"], answer: 1 },
    { q: "Which of these is a supervised learning task?", options: ["Clustering", "Classification", "Dimensionality Reduction", "Anomaly Detection"], answer: 1 }
  ],
  intermediate: [
    { q: "What is overfitting?", options: ["When a model is too small", "When a model learns the training data perfectly but fails to generalize", "When processing takes too long", "When the learning rate is too high"], answer: 1 },
    { q: "Which algorithm is used for decision trees?", options: ["K-Means", "CART", "PCA", "Apriori"], answer: 1 },
    { q: "What is cross-validation used for?", options: ["Evaluating model performance on unseen data", "Speeding up training", "Cleaning missing values", "Connecting to a database"], answer: 0 },
    { q: "What is the purpose of an activation function in a neural network?", options: ["To start the program", "To introduce non-linearity", "To stop the loop", "To connect layers"], answer: 1 },
    { q: "Which loss function is commonly used for binary classification?", options: ["Mean Squared Error", "Binary Cross-Entropy", "Huber Loss", "Hinge Loss"], answer: 1 }
  ],
  advanced: [
    { q: "What is the main advantage of LSTMs over standard RNNs?", options: ["They are faster to train", "They solve the vanishing gradient problem", "They use less memory", "They don't require activation functions"], answer: 1 },
    { q: "In Transformers, what does the Self-Attention mechanism do?", options: ["Weighs importance of different words in the input sequence", "Translates directly to output", "Compresses the input vector", "Handles database queries"], answer: 0 },
    { q: "What is the purpose of the kernel trick in SVMs?", options: ["To speed up training", "To operate in a high-dimensional feature space without computing the coordinates", "To compress data", "To handle missing values automatically"], answer: 1 },
    { q: "Which technique is used to prevent mode collapse in GANs?", options: ["Minibatch discrimination", "Increasing learning rate", "Using only ReLU", "Removing the generator"], answer: 0 },
    { q: "What does BLEU score measure?", options: ["Image resolution", "Quality of machine-translated text", "Audio clarity", "Model inference speed"], answer: 1 }
  ]
};

const UIUX_QUESTIONS = {
  beginner: [
    { q: "What does UI stand for?", options: ["User Interface", "Unified Integration", "Useful Information", "User Identity"], answer: 0 },
    { q: "What does UX stand for?", options: ["User Experience", "Universal XML", "Unified Extension", "User Examination"], answer: 0 },
    { q: "Which tool is commonly used for UI design?", options: ["Visual Studio Code", "Figma", "Docker", "Postman"], answer: 1 },
    { q: "What is wireframing?", options: ["Writing code", "A low-fidelity visual representation of a website", "Testing a database", "Optimizing images"], answer: 1 },
    { q: "What is whitespace in design?", options: ["Empty space between design elements", "A color hex code", "A broken image", "A loading screen"], answer: 0 }
  ],
  intermediate: [
    { q: "What is a Design System?", options: ["A collection of reusable components and standards", "A specific Adobe software", "A color palette only", "A backend database schema"], answer: 0 },
    { q: "What does a heuristic evaluation mainly test?", options: ["Code performance", "Usability issues against recognized principles", "Server response time", "SEO ranking"], answer: 1 },
    { q: "In typography, what is 'kerning'?", options: ["Space between lines", "Space between individual characters", "Font weight", "Font color"], answer: 1 },
    { q: "What is an affordance in UX?", options: ["The cost of the software", "A visual cue indicating how an object can be interacted with", "A subscription plan", "A type of animation"], answer: 1 },
    { q: "Which contrast ratio is recommended by WCAG for normal text (Level AA)?", options: ["3:1", "4.5:1", "7:1", "1:1"], answer: 1 }
  ],
  advanced: [
    { q: "What characterizes the 'F-shaped pattern' in eye-tracking?", options: ["Users read in an F shape on text-heavy pages", "Users always look at the footer first", "Users ignore the left side", "Images must be F-shaped"], answer: 0 },
    { q: "In interaction design, what is 'Fitts's Law' primarily about?", options: ["Color contrast", "Time required to rapidly move to a target area", "Load times", "Typography sizes"], answer: 1 },
    { q: "What is the primary goal of cognitive walkthroughs?", options: ["To evaluate ease of learning for new users", "To test server load", "To check code syntax", "To measure contrast"], answer: 0 },
    { q: "Which UX research method is best for discovering WHY users behave a certain way?", options: ["A/B Testing", "Analytics tracking", "Qualitative User Interviews", "Heatmaps"], answer: 2 },
    { q: "What defines 'Atomic Design' methodology?", options: ["Breaking interfaces down into atoms, molecules, organisms, templates, and pages", "Designing only for atomic screens", "Using radioactive colors", "A CSS framework"], answer: 0 }
  ]
};

const DEFAULT_QUESTIONS = {
  beginner: [
    { q: "What is the primary purpose of HTML?", options: ["Styling", "Structure", "Logic", "Database Connectivity"], answer: 1 },
    { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Color Style System"], answer: 1 },
    { q: "Which of these is a valid boolean value in most programming languages?", options: ["'true'", "Yes", "true", "1"], answer: 2 },
    { q: "What is a 'variable' in programming?", options: ["A fixed number", "A container for storing data", "A type of loop", "A styling property"], answer: 1 },
    { q: "Which tag is used for the largest heading in HTML?", options: ["<h6>", "<head>", "<h1>", "<heading>"], answer: 2 },
  ],
  intermediate: [
    { q: "What is a Closure in JavaScript?", options: ["A locked object", "A function bundled with its lexical environment", "Closing a database connection", "Error try-catch block"], answer: 1 },
    { q: "Which keyword is used to handle asynchronous operations most cleanly in modern JS?", options: ["async/await", "setTimeout", "Promise.then()", "defer"], answer: 0 },
    { q: "What is the Virtual DOM exactly?", options: ["A direct 1:1 copy of the HTML DOM", "A lightweight, in-memory representation of the UI", "A backend render server process", "A browser extension"], answer: 1 },
    { q: "What does REST stand for in Web APIs?", options: ["Response State Transfer", "Representational State Transfer", "Request Status Tracker", "Restricted Server Testing"], answer: 1 },
    { q: "Which array method creates a completely new array populated with the results of a formatting function?", options: [".forEach()", ".map()", ".filter()", ".reduce()"], answer: 1 },
  ],
  advanced: [
    { q: "What is Event Delegation in the DOM?", options: ["Assigning individual events to all children", "Placing one event listener on a parent wrapper", "Delegating heavy load to a Web Worker", "Removing all events before unmount"], answer: 1 },
    { q: "In React, what is the primary purpose of useMemo?", options: ["To fetch stateful data", "To memorize user typing inputs", "To memoize expensive calculations", "To persist data to local storage"], answer: 2 },
    { q: "What is the Time Complexity of a binary search tree lookup in the worst possible case (unbalanced)?", options: ["O(log n)", "O(1)", "O(n log n)", "O(n)"], answer: 3 },
    { q: "Which HTTP header is strictly required to trigger a CORS preflight request?", options: ["Authorization", "Access-Control-Request-Method", "Content-Type", "Host"], answer: 1 },
    { q: "How does the Node.js Event Loop handle blocking synchronous code?", options: ["It uses thread pools automatically", "It blocks the entire loop until finished", "It defers it to asynchronous promises", "It skips it after a timeout"], answer: 1 },
  ]
};

const MENTOR_QUESTIONS = [
  { q: "Explain the internal mechanism of ConcurrentHashMap in Java matching High Performance?", options: ["It locks the whole table", "It uses Segment locking or CAS operations", "It doesn't handle concurrency", "It creates a synchronized block over the map"], answer: 1 },
  { q: "What makes a microservices architecture inherently difficult compared to a monolith?", options: ["Distributed transactions and eventual consistency", "It uses more CPU on a single machine", "Code is structured in a single repository", "Lack of logging tools"], answer: 0 },
  { q: "How does Garbage Collection (G1GC) determine which objects to collect?", options: ["By sweeping all objects sequentially", "By dividing the heap into regions and prioritizing regions with mostly garbage", "It waits for memory to be fully full then cleans all", "It relies on developer executing System.gc()"], answer: 1 },
  { q: "In System Design, when would you strictly choose a NoSQL database over a relational database?", options: ["When ACID compliance is perfectly required", "When the schema is highly structured and rigid", "When handling massive scale and unstructured/semi-structured data", "When joining multiple tables frequently"], answer: 2 },
  { q: "How do you avoid caching stale data in a high concurrency distributed system?", options: ["Setting extremely low TTLs for all keys", "Cache-Aside pattern with invalidation events", "Writing directly to the cache and async to DB without locks", "Never caching data"], answer: 1 },
];

const getCustomQuiz = (skillStr: string, levelStr: string, isMentor: boolean) => {
  if (isMentor) return MENTOR_QUESTIONS;
  const s = skillStr.toLowerCase();
  let bank: any = DEFAULT_QUESTIONS;
  if (s.includes('machine learning') || s.includes('ml') || s.includes('ai') || s.includes('data')) {
    bank = ML_QUESTIONS;
  } else if (s.includes('ui') || s.includes('ux') || s.includes('design') || s.includes('figma')) {
    bank = UIUX_QUESTIONS;
  }
  return bank[levelStr] || bank.beginner;
};

export default function OnboardingPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Shared Onboarding State
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("2-4 hours/week");

  // Mentor Specific State
  const [experienceYears, setExperienceYears] = useState("1-3 years");
  const [currentRole, setCurrentRole] = useState("Working Professional");
  const [companyOrCollege, setCompanyOrCollege] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [teachingLevel, setTeachingLevel] = useState("Beginner");

  // Learner Specific State
  const [learningStyle, setLearningStyle] = useState("Project-based");
  const [level, setLevel] = useState("beginner");
  const [preferredTime, setPreferredTime] = useState("Evening");

  // --- QUIZ VERIFICATION STATE ---
  const [isQuizProcessing, setIsQuizProcessing] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResultFeedback, setShowResultFeedback] = useState(false);
  const [finalVerifiedLevel, setFinalVerifiedLevel] = useState("");

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
  }, [navigate]);

  const isMentor = profile?.role === 'mentor';

  const handleProceedToVerification = () => {
    setStep(3);
    setIsQuizProcessing(true);
    setTimeout(() => {
      setIsQuizProcessing(false);
      setQuizStarted(true);
    }, 2500); // Simulate AI generation delay
  };

  const handleAnswerClick = (optionIdx: number) => {
    if (showResultFeedback) return;

    setSelectedOption(optionIdx);
    setShowResultFeedback(true);

    const currentQuestions = getCustomQuiz(skills, level, isMentor);
    const currentQ = currentQuestions[currentQuestionIndex];
    if (optionIdx === currentQ.answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setShowResultFeedback(false);

      if (currentQuestionIndex < 4) { // 5 questions total (0 to 4)
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    setQuizFinished(true);

    // Evaluate Level: Needs 4 or 5 out of 5 (80% or 100%) to maintain, otherwise downgrade.
    // User requested 70%, 5 questions. 70% of 5 = 3.5. So 4/5 is pass.
    let evaluatedLevel = level;
    // We incremented score async, so we use actual calculation in real time. 
    // Wait, the score state might be slightly delayed in closure, we will calculate based on state. 
    // Actually, `setScore` updates async, so we need to rely on the render cycle. We'll evaluate in an effect or directly in the UI.
  };

  // Evaluate Level whenever quiz finishes
  useEffect(() => {
    if (quizFinished) {
      if (isMentor) {
        setFinalVerifiedLevel(score >= 4 ? "Expert Verified" : "Verification Failed");
      } else {
        let resultLevel = level;
        // Pass is 4 or 5
        if (score < 4) {
          if (level === "advanced") resultLevel = "intermediate";
          else if (level === "intermediate") resultLevel = "beginner";
        }
        setFinalVerifiedLevel(resultLevel);
      }
    }
  }, [quizFinished, score, level, isMentor]);

  const handleFinish = async (verifiedLvlStr: string) => {
    setSaving(true);

    try {
      setTimeout(() => {
        const updatedProfile = {
          ...profile,
          onboarded: true,
          ...(profile.role === 'mentor'
            ? {
              skills: skills.split(",").map(s => s.trim()),
              experience: experienceYears,
              currentRole,
              companyOrCollege,
              jobTitle,
              teachingLevel,
              availability,
              verificationScore: score,
              verifiedStatus: verifiedLvlStr
            }
            : {
              skills: skills.split(",").map(s => s.trim()),
              level: verifiedLvlStr, // verified level securely saved
              claimedLevel: level, // keep track of what they claimed originally
              learningStyle,
              preferredTime,
              availability,
              verificationScore: score
            }
          )
        };

        localStorage.setItem("mockProfile", JSON.stringify(updatedProfile));
        toast.success("Profile fully verified and completed! Welcome aboard.");
        navigate(`/dashboard/${profile.role}`);
      }, 1200);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  // Determine total steps visually
  const totalVisualSteps = 3;

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[100px]" />

      <div className="relative w-full max-w-2xl">
        <div className="bg-[#161B22]/80 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

          {/* Progress Indicator */}
          {!isQuizProcessing && !quizStarted && !quizFinished && (
            <div className="flex justify-between items-center mb-10">
              <div className="flex gap-2">
                {Array.from({ length: totalVisualSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-16 rounded-full transition-all duration-500 ${step >= idx + 1 ? 'bg-gradient-to-r from-orange-400 to-amber-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]' : 'bg-slate-800'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {step} of {totalVisualSteps}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 text-orange-400 mb-2 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {isMentor ? "Professional Identity" : "Personalize Experience"}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">
                    {isMentor ? "Define your " : "Tell us about your "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                      {isMentor ? "Expertise" : "Goals"}
                    </span>
                  </h1>
                  <p className="text-sm text-slate-400">
                    {isMentor ? "Help us showcase who you are so learners can find you easily." : "Help us construct the perfect curriculum and mentor match for you."}
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      {isMentor ? "What are your core skills & expertise?" : "What do you want to learn?"}
                    </label>
                    <div className="relative">
                      <Code className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                      <textarea
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full bg-[#0D1117] border border-slate-700/80 text-white rounded-xl py-3.5 pl-12 pr-4 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-orange-500/50 shadow-inner transition-all resize-none"
                        placeholder={isMentor ? "e.g., React, System Design, Cloud Architecture" : "e.g., Full Stack Web Development, Machine Learning, UI/UX"}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-medium">Separate skills with commas</p>
                  </div>

                  {isMentor ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                          Current Primary Role
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: "Student", icon: GraduationCap },
                            { id: "Working Professional", icon: Briefcase },
                            { id: "Freelancer", icon: UserCircle }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setCurrentRole(opt.id)}
                              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${currentRole === opt.id
                                ? "border-orange-500 bg-orange-500/10 text-white shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                                : "border-slate-800 bg-[#0D1117] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                                }`}
                            >
                              <opt.icon className={`w-5 h-5 ${currentRole === opt.id ? "text-orange-400" : "text-slate-500"}`} />
                              <span className="text-xs font-semibold text-center leading-tight">{opt.id}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                            Company or College Name
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                              type="text"
                              value={companyOrCollege}
                              onChange={(e) => setCompanyOrCollege(e.target.value)}
                              className="w-full bg-[#0D1117] border border-slate-700/80 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-orange-500/50 shadow-inner transition-all"
                              placeholder="e.g. Google, MIT"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                            Current Job Title (Optional)
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                              type="text"
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                              className="w-full bg-[#0D1117] border border-slate-700/80 text-white text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-orange-500/50 shadow-inner transition-all"
                              placeholder="e.g. Senior Engineer"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                          What is your preferred Learning Style?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Project-based", "Theory-first", "Pair Programming", "Video Tutorials"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setLearningStyle(opt)}
                              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${learningStyle === opt
                                ? "border-orange-500 bg-orange-500/10 text-white shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                                : "border-slate-800 bg-[#0D1117] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                                }`}
                            >
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${learningStyle === opt ? "border-orange-500" : "border-slate-600"
                                }`}>
                                {learningStyle === opt && <div className="w-2 h-2 bg-orange-400 rounded-full" />}
                              </div>
                              <span className="text-sm font-semibold">{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!skills.trim() || (isMentor && (!companyOrCollege.trim()))}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-8 shadow-lg shadow-orange-500/20"
                >
                  Continue Setup
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 text-orange-400 mb-2 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{isMentor ? "Final Step" : "Almost There"}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-100 mb-2 tracking-tight">
                    Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Availability</span>
                  </h1>
                  <p className="text-sm text-slate-400">Let's coordinate schedules to ensure optimal engagement.</p>
                </div>

                <div className="space-y-6">
                  {/* Experience / Level */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wide">
                      {isMentor ? "Years of Experience in Core Skill" : "What is your current proficiency level?"}
                    </label>
                    <div className="grid gap-3">
                      {isMentor ? (
                        <div className="grid grid-cols-2 gap-3">
                          {["1-3 years", "3-5 years", "5-10 years", "10+ years"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setExperienceYears(opt)}
                              className={`p-3.5 rounded-xl border transition-all text-sm font-semibold flex items-center gap-3 ${experienceYears === opt
                                ? "border-orange-500 bg-orange-500/10 text-white"
                                : "border-slate-800 bg-[#0D1117] text-slate-400 hover:border-slate-700"
                                }`}
                            >
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${experienceYears === opt ? "border-orange-500" : "border-slate-600"
                                }`}>
                                {experienceYears === opt && <div className="w-2 h-2 bg-orange-400 rounded-full" />}
                              </div>
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : (
                        [
                          { id: "beginner", label: "Beginner", desc: "Just starting out, need foundational knowledge" },
                          { id: "intermediate", label: "Intermediate", desc: "Have some experience, can build simple things" },
                          { id: "advanced", label: "Advanced", desc: "Deep knowledge, looking for expert guidance" }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setLevel(opt.id)}
                            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${level === opt.id
                              ? "border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                              : "border-slate-800 bg-[#0D1117] hover:border-slate-700"
                              }`}
                          >
                            <div>
                              <div className={`font-bold text-sm ${level === opt.id ? "text-orange-400" : "text-slate-300"}`}>{opt.label}</div>
                              <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                            </div>
                            {level === opt.id && <CheckCircle2 className="w-6 h-6 text-orange-500" />}
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Availability Block */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Mentor Specific: Teaching Level */}
                    {isMentor && (
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wide">
                          Who do you want to teach?
                        </label>
                        <div className="space-y-2">
                          {["Beginner", "Intermediate", "Advanced"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setTeachingLevel(opt)}
                              className={`w-full p-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-2 ${teachingLevel === opt
                                ? "border-orange-500 bg-orange-500/10 text-white"
                                : "border-slate-800 bg-[#0D1117] text-slate-400 hover:border-slate-700"
                                }`}
                            >
                              <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${teachingLevel === opt ? "border-orange-500" : "border-slate-600"
                                }`}>
                                {teachingLevel === opt && <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />}
                              </div>
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Weekly Availability */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wide">
                        Weekly Availability
                      </label>
                      <div className="space-y-2">
                        {["1-2 hours", "2-4 hours", "5-8 hours", "10+ hours"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setAvailability(opt)}
                            className={`w-full p-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-2 ${availability === opt
                              ? "border-orange-500 bg-orange-500/10 text-white"
                              : "border-slate-800 bg-[#0D1117] text-slate-400 hover:border-slate-700"
                              }`}
                          >
                            <Calendar className="w-4 h-4 opacity-50" />
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Learning Time for Learners */}
                    {!isMentor && (
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wide">
                          Preferred Time
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: "Morning", icon: Sunrise },
                            { id: "Afternoon", icon: Clock },
                            { id: "Evening", icon: Moon },
                            { id: "Weekends", icon: Calendar }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setPreferredTime(opt.id)}
                              className={`w-full p-3 rounded-lg border text-xs font-semibold transition-all flex items-center gap-2 ${preferredTime === opt.id
                                ? "border-orange-500 bg-orange-500/10 text-white"
                                : "border-slate-800 bg-[#0D1117] text-slate-400 hover:border-slate-700"
                                }`}
                            >
                              <opt.icon className="w-4 h-4 opacity-50" />
                              {opt.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-slate-700 text-slate-400 font-bold py-3.5 px-6 rounded-xl hover:bg-[#0D1117] hover:text-white transition-all focus:outline-none"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleProceedToVerification}
                    className="flex-[2] bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-orange-500/20 disabled:opacity-50"
                  >
                    Verify Skills Using AI
                    <Cpu className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: AI VERIFICATION SCREEN */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {isQuizProcessing ? (
                  // AI Loading State
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-[#0D1117] border border-orange-500/50 rounded-[2rem] flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                        <Cpu className="w-10 h-10 text-orange-500 animate-pulse" />
                      </div>
                      <div className="absolute inset-0 border-2 border-orange-500 border-t-transparent rounded-[2rem] animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">Analyzing your profile...</h2>
                    <p className="text-slate-400 text-sm max-w-sm">
                      Our AI is generating custom questions to dynamically verify your {isMentor ? 'expertise' : `${level} proficiency`}.
                    </p>
                  </div>
                ) : quizStarted && !quizFinished ? (
                  // Active Quiz View
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Skill Verification</span>
                      </div>
                      <span className="text-sm font-bold text-slate-400">Question {currentQuestionIndex + 1} of 5</span>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-slate-100 min-h-[80px] leading-snug">
                        {getCustomQuiz(skills, level, isMentor)[currentQuestionIndex].q}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {getCustomQuiz(skills, level, isMentor)[currentQuestionIndex].options.map((opt, idx) => {
                        const isCorrectAnswer = getCustomQuiz(skills, level, isMentor)[currentQuestionIndex].answer === idx;
                        const isSelected = selectedOption === idx;

                        let btnStyle = "border-slate-700 bg-[#0D1117] hover:border-orange-500/50 hover:bg-orange-500/5 text-slate-300";

                        if (showResultFeedback) {
                          if (isCorrectAnswer) {
                            btnStyle = "border-green-500 bg-green-500/20 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                          } else if (isSelected && !isCorrectAnswer) {
                            btnStyle = "border-red-500 bg-red-500/20 text-white";
                          } else {
                            btnStyle = "border-slate-800 bg-[#0D1117] opacity-40 text-slate-500";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={showResultFeedback}
                            onClick={() => handleAnswerClick(idx)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all font-semibold flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {showResultFeedback && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-8 overflow-hidden">
                      <div
                        className="bg-orange-500 h-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  // Quiz Results Screen
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-6 relative">
                      <div className="w-24 h-24 bg-[#0D1117] border border-orange-500/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                        <span className="text-4xl font-bold text-orange-500">{score}<span className="text-xl text-slate-500">/5</span></span>
                      </div>
                      <svg className="absolute inset-0 w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="46" stroke="CurrentColor" strokeWidth="4" fill="none" className="text-slate-800" />
                        <circle cx="48" cy="48" r="46" stroke="CurrentColor" strokeWidth="4" fill="none" className="text-orange-500 transition-all duration-1000" strokeDasharray={`${(score / 5) * 289} 289`} />
                      </svg>
                    </div>

                    {score >= 4 ? (
                      <>
                        <h2 className="text-2xl font-bold text-slate-100 mb-2">Excellent Work!</h2>
                        <p className="text-slate-400 text-sm mb-8 px-4">
                          You scored {(score / 5) * 100}%. We've successfully validated your {isMentor ? "expertise" : "proficiency"} at the <strong className="text-orange-400 uppercase">{isMentor ? "EXPERT" : level}</strong> level.
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-slate-100 mb-2">{isMentor ? "Verification Failed" : "Great Effort!"}</h2>
                        <p className="text-slate-400 text-sm mb-8 px-4">
                          {isMentor ? (
                            "Based on your score, we could not verify your expert-level proficiency for the skills you claimed. Consider adjusting your profile or brushing up on your skills."
                          ) : (
                            <>
                              Based on your score, we are placing you in the <strong className="text-orange-400 uppercase">{finalVerifiedLevel}</strong> track to ensure you get the absolute best mentorship experience without feeling overwhelmed.
                            </>
                          )}
                        </p>
                      </>
                    )}

                    <button
                      onClick={() => handleFinish(finalVerifiedLevel)}
                      disabled={saving}
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-orange-500/20"
                    >
                      {saving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Finalize Profile & Launch
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}