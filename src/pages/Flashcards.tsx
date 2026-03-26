import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Layers, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, Brain } from "lucide-react";
import { cn } from "../lib/utils";
import { flashcardsData } from "../data/flashcards";
import { getDueFlashcardIds, useStudyProgress } from "../lib/studyProgress";

export default function Flashcards() {
  const { progress, reviewFlashcard } = useStudyProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dueOnlyMode, setDueOnlyMode] = useState(true);

  const allCardIds = useMemo(() => flashcardsData.map((card) => card.id), []);
  const dueCardIds = useMemo(
    () => getDueFlashcardIds(progress, allCardIds),
    [progress, allCardIds],
  );

  const activeDeck = useMemo(() => {
    const ids = dueOnlyMode ? dueCardIds : allCardIds;
    if (!ids.length) return [];
    return ids
      .map((id) => flashcardsData.find((card) => card.id === id))
      .filter((card) => Boolean(card));
  }, [dueOnlyMode, dueCardIds, allCardIds]);

  const safeDeckIndex = activeDeck.length ? Math.min(currentIndex, activeDeck.length - 1) : 0;
  const card = activeDeck[safeDeckIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, activeDeck.length));
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + Math.max(1, activeDeck.length)) % Math.max(1, activeDeck.length));
    }, 150);
  };

  const handleReview = (quality: "again" | "good" | "easy") => {
    if (!card) return;
    reviewFlashcard(card.id, quality);
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  if (!card) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto"
      >
        <header className="border-b border-slate-200 pb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Layers className="w-8 h-8 text-amber-600" />
            Flashcards
          </h2>
          <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            0 due
          </div>
        </header>

        <section className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
          <h3 className="text-xl font-bold text-emerald-900">Daily revision queue complete 🎉</h3>
          <p className="text-emerald-800">
            You are done for today. You can still browse all cards for extra revision.
          </p>
          <button
            onClick={() => {
              setDueOnlyMode(false);
              setCurrentIndex(0);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
          >
            Browse all flashcards
          </button>
        </section>
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
          <Layers className="w-8 h-8 text-amber-600" />
          Flashcards
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDueOnlyMode(true);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold transition-colors",
              dueOnlyMode ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600",
            )}
          >
            Due: {dueCardIds.length}
          </button>
          <button
            onClick={() => {
              setDueOnlyMode(false);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold transition-colors",
              !dueOnlyMode ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-600",
            )}
          >
            All: {flashcardsData.length}
          </button>
        </div>
      </header>

      <section className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-900 flex items-start gap-2">
        <Brain className="w-4 h-4 mt-0.5 text-blue-600" />
        <span>
          Spaced repetition is active. Review cards with <strong>Again</strong>, <strong>Good</strong>, or <strong>Easy</strong> to automatically schedule the next revision date.
        </span>
      </section>

      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <div 
          className="relative w-full aspect-[4/3] max-w-md cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full relative preserve-3d transition-transform duration-500"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
          >
            {/* Front */}
            <div className={cn(
              "absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm",
              isFlipped ? "invisible" : "visible"
            )}>
              <span className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">Term</span>
              <h3 className="text-3xl font-bold text-slate-900">{card.term}</h3>
              <p className="text-slate-400 text-sm mt-8 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Tap to flip
              </p>
            </div>

            {/* Back */}
            <div 
              className={cn(
                "absolute inset-0 backface-hidden bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm",
                !isFlipped ? "invisible" : "visible"
              )}
              style={{ transform: "rotateY(180deg)" }}
            >
              <span className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">Definition</span>
              <p className="text-xl font-medium text-amber-900 leading-relaxed">{card.definition}</p>
            </div>
          </motion.div>
        </div>

        {isFlipped && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md">
            <button
              onClick={() => handleReview("again")}
              className="px-4 py-2.5 rounded-xl bg-rose-100 text-rose-800 font-medium hover:bg-rose-200 transition-colors"
            >
              Again
            </button>
            <button
              onClick={() => handleReview("good")}
              className="px-4 py-2.5 rounded-xl bg-indigo-100 text-indigo-800 font-medium hover:bg-indigo-200 transition-colors"
            >
              Good
            </button>
            <button
              onClick={() => handleReview("easy")}
              className="px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-medium hover:bg-emerald-200 transition-colors"
            >
              Easy
            </button>
          </div>
        )}

        <div className="flex items-center gap-6">
          <button
            onClick={handlePrev}
            className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="p-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
