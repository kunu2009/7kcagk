import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { mcqData, type MCQItem } from "../data/mcqs";
import { BrainCircuit, CheckCircle2, XCircle, ArrowRight, RotateCcw, Filter, Flame, Trophy } from "lucide-react";
import { cn } from "../lib/utils";
import { useStudyProgress } from "../lib/studyProgress";

type QuizMode = "daily" | "weekly-mock" | "weak-topics";
type DifficultyFilter = "all" | "easy" | "medium" | "hard";

function shuffle<T>(arr: T[]) {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function getModeQuestionCount(mode: QuizMode) {
  if (mode === "weekly-mock") return 50;
  if (mode === "weak-topics") return 30;
  return 25;
}

export default function Quiz() {
  const { metrics, markQuizSession } = useStudyProgress();

  const [quizMode, setQuizMode] = useState<QuizMode>("daily");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sessionSeed, setSessionSeed] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);
  const [sessionByCategory, setSessionByCategory] = useState<Record<string, { attempted: number; correct: number }>>({});

  const categories = useMemo(() => {
    const set = new Set(mcqData.map((q) => q.category));
    return ["all", ...Array.from(set)];
  }, []);

  const weakTopicsSet = useMemo(() => {
    const weak = metrics.weakCategories.slice(0, 3).map((c) => c.category);
    return new Set(weak);
  }, [metrics.weakCategories]);

  const sessionQuestions = useMemo(() => {
    const filtered = mcqData.filter((q) => {
      if (difficulty !== "all" && (q.difficulty ?? "medium") !== difficulty) return false;
      if (selectedCategory !== "all" && q.category !== selectedCategory) return false;
      if (quizMode === "weak-topics" && weakTopicsSet.size > 0 && !weakTopicsSet.has(q.category)) return false;
      return true;
    });

    const count = getModeQuestionCount(quizMode);
    return shuffle(filtered).slice(0, Math.min(count, filtered.length));
  }, [difficulty, selectedCategory, quizMode, weakTopicsSet, sessionSeed]);

  const question = sessionQuestions[currentQuestion] as MCQItem | undefined;

  const handleOptionSelect = (index: number) => {
    if (isAnswered || !question) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === question.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSessionByCategory((prev) => {
      const entry = prev[question.category] ?? { attempted: 0, correct: 0 };
      return {
        ...prev,
        [question.category]: {
          attempted: entry.attempted + 1,
          correct: entry.correct + (isCorrect ? 1 : 0),
        },
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion < sessionQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      if (!sessionSaved) {
        markQuizSession(score, sessionQuestions.length, sessionByCategory);
        setSessionSaved(true);
      }
      setShowResult(true);
    }
  };

  const resetSession = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setSessionSaved(false);
    setSessionByCategory({});
    setSessionSeed((s) => s + 1);
  };

  if (!sessionQuestions.length) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-20 md:pb-0 max-w-3xl mx-auto">
        <header className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-rose-600" /> Practice MCQs
          </h2>
        </header>
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-slate-600">No questions matched your current filters. Try broader settings.</p>
          <button onClick={() => { setDifficulty("all"); setSelectedCategory("all"); setQuizMode("daily"); setSessionSeed((s) => s + 1); }} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
            Reset Filters
          </button>
        </section>
      </motion.div>
    );
  }

  if (showResult) {
    const percent = Math.round((score / sessionQuestions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
      >
        <div className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center",
          percent >= 70 ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-700",
        )}>
          {quizMode === "weekly-mock" ? <Trophy className="w-12 h-12" /> : <CheckCircle2 className="w-12 h-12" />}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{quizMode === "weekly-mock" ? "Weekly Mock Finished" : "Session Completed"}</h2>
          <p className="text-slate-500 mt-2">You scored {score} / {sessionQuestions.length} ({percent}%)</p>
          <p className="text-xs text-slate-500 mt-2">
            Lifetime: {metrics.totalQuizCorrect}/{metrics.totalQuizAttempted} correct ({metrics.quizAccuracy}% accuracy)
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetSession}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            New Session
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20 md:pb-0 max-w-3xl mx-auto"
    >
      <header className="border-b border-slate-200 pb-4 flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-rose-600" />
          Practice MCQs
        </h2>
        <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
          <span>{currentQuestion + 1} / {sessionQuestions.length}</span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs">{metrics.quizAccuracy}% acc</span>
        </div>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm grid md:grid-cols-4 gap-3">
        <label className="text-xs font-semibold text-slate-500 space-y-1">
          <span className="flex items-center gap-1"><Filter className="w-3 h-3" />Mode</span>
          <select value={quizMode} onChange={(e) => { setQuizMode(e.target.value as QuizMode); resetSession(); }} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-slate-700 bg-white">
            <option value="daily">Daily Practice (25)</option>
            <option value="weekly-mock">Weekly Mock (50)</option>
            <option value="weak-topics">Weak Topics (30)</option>
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-500 space-y-1">
          <span>Difficulty</span>
          <select value={difficulty} onChange={(e) => { setDifficulty(e.target.value as DifficultyFilter); resetSession(); }} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-slate-700 bg-white">
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-500 space-y-1 md:col-span-2">
          <span>Category</span>
          <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); resetSession(); }} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-slate-700 bg-white">
            {categories.map((category) => (
              <option key={category} value={category}>{category === "all" ? "All categories" : category}</option>
            ))}
          </select>
        </label>

        <div className="md:col-span-4 text-xs text-slate-500 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          Streak: <strong className="text-slate-700">{metrics.currentStreak} days</strong> (best: {metrics.longestStreak})
        </div>
      </section>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
              {question?.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              {(question?.difficulty ?? "medium").toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {question?.question}
          </h3>
        </div>

        <div className="space-y-3">
          {question?.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctAnswer;
            const showCorrect = isAnswered && isCorrect;
            const showWrong = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between",
                  !isAnswered && "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50",
                  isSelected && !isAnswered && "border-indigo-600 bg-indigo-50",
                  showCorrect && "border-emerald-500 bg-emerald-50",
                  showWrong && "border-rose-500 bg-rose-50",
                  isAnswered && !isSelected && !isCorrect && "border-slate-100 opacity-50"
                )}
              >
                <span className={cn(
                  "font-medium",
                  showCorrect ? "text-emerald-700" : showWrong ? "text-rose-700" : "text-slate-700"
                )}>
                  {option}
                </span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {showWrong && <XCircle className="w-5 h-5 text-rose-500" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="pt-4 border-t border-slate-200 space-y-4"
            >
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-blue-800 mb-1">Explanation:</h4>
                <p className="text-sm text-blue-900 leading-relaxed">
                  {question?.explanation}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                >
                  {currentQuestion < sessionQuestions.length - 1 ? "Next Question" : "Finish Session"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
