import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BookOpen, BrainCircuit, GraduationCap, Target, CalendarDays, Award, Layers, PlaySquare, CircleCheck, ClipboardList, Brain } from "lucide-react";
import { getTotalCurrentAffairTopics } from "../lib/currentAffairs";
import { useStudyProgress, getDueFlashcardIds } from "../lib/studyProgress";
import { flashcardsData } from "../data/flashcards";

export default function Dashboard() {
  const { metrics, progress } = useStudyProgress();
  const totalCurrentAffairs = getTotalCurrentAffairTopics();
  const dueFlashcards = getDueFlashcardIds(progress, flashcardsData.map((card) => card.id)).length;
  const caRemaining = Math.max(totalCurrentAffairs - metrics.caCompleted, 0);

  const stats = [
    { label: "Days Left", value: "300+", icon: CalendarDays, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "MCQs Solved", value: String(metrics.totalQuizAttempted), icon: Target, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Accuracy", value: `${metrics.quizAccuracy}%`, icon: Award, color: "text-blue-600", bg: "bg-blue-100" },
  ];

  const quickLinks = [
    { to: "/ca", title: "Current Affairs", desc: "Last 15 months coverage", icon: BookOpen, color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" },
    { to: "/gk", title: "Static GK", desc: "History, Polity, Geography", icon: GraduationCap, color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
    { to: "/quiz", title: "Mock Tests", desc: "Practice MCQs with explanations", icon: BrainCircuit, color: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" },
    { to: "/flashcards", title: "Flashcards", desc: "Quick revision of key terms", icon: Layers, color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" },
    { to: "/reels", title: "Quick Facts", desc: "Bite-sized GK & CA reels", icon: PlaySquare, color: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20 md:pb-0"
    >
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, Aspirant!</h2>
        <p className="text-slate-500 mt-2">Your journey to a top law college starts here. Let's conquer the GK & CA section.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center gap-2"
          >
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Links */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-slate-800">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => (
            <Link key={i} to={link.to}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border transition-colors flex flex-col h-full ${link.color}`}
              >
                <link.icon className="w-8 h-8 mb-4" />
                <h4 className="text-lg font-bold mb-1">{link.title}</h4>
                <p className="text-sm opacity-80">{link.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Daily Queue
          </h3>
          <p className="text-2xl font-bold text-slate-900 mt-2">{Math.min(5, caRemaining)} CA Topics</p>
          <p className="text-sm text-slate-500 mt-1">Target for today</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Flashcards Due
          </h3>
          <p className="text-2xl font-bold text-slate-900 mt-2">{dueFlashcards}</p>
          <p className="text-sm text-slate-500 mt-1">Spaced revision cards</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <CircleCheck className="w-4 h-4" />
            CA Coverage
          </h3>
          <p className="text-2xl font-bold text-slate-900 mt-2">{metrics.caCompleted}/{totalCurrentAffairs}</p>
          <p className="text-sm text-slate-500 mt-1">Topics revised overall</p>
        </div>
      </section>

      {/* Daily Tip */}
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Award className="w-24 h-24 text-amber-900" />
        </div>
        <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Tip of the Day
        </h3>
        <p className="text-amber-800 relative z-10">
          "Focus heavily on Legal Current Affairs. Supreme Court judgments, new bills passed in Parliament, and constitutional amendments are high-yield topics for MHCET Law."
        </p>
      </section>
    </motion.div>
  );
}
