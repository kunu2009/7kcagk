import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { mcqData } from "../data/mcqs";
import { BrainCircuit, CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";
import { useStudyProgress } from "../lib/studyProgress";

export default function Quiz() {
  const { metrics, markQuizSession } = useStudyProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  const question = mcqData[currentQuestion];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mcqData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      if (!sessionSaved) {
        markQuizSession(score, mcqData.length);
        setSessionSaved(true);
      }
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setSessionSaved(false);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
      >
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Quiz Completed!</h2>
          <p className="text-slate-500 mt-2">You scored {score} out of {mcqData.length}</p>
          <p className="text-xs text-slate-500 mt-2">
            Lifetime: {metrics.totalQuizCorrect}/{metrics.totalQuizAttempted} correct ({metrics.quizAccuracy}% accuracy)
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Restart Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto"
    >
      <header className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-rose-600" />
          Practice MCQs
        </h2>
        <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
          <span>{currentQuestion + 1} / {mcqData.length}</span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs">{metrics.quizAccuracy}% acc</span>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
            {question.category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {question.question}
          </h3>
        </div>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
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
                  {question.explanation}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                >
                  {currentQuestion < mcqData.length - 1 ? "Next Question" : "Finish Quiz"}
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
