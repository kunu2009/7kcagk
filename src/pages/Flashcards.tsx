import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";

const flashcardsData = [
  { term: "Article 32", definition: "Right to Constitutional Remedies. Dr. B.R. Ambedkar called it the 'heart and soul' of the Constitution." },
  { term: "Repo Rate", definition: "The rate at which the Reserve Bank of India (RBI) lends short-term money to commercial banks." },
  { term: "First Battle of Panipat", definition: "Fought in 1526 between Babur and Ibrahim Lodi. Marked the beginning of the Mughal Empire." },
  { term: "COP30 (2025)", definition: "UN Climate Change Conference held in BelÃ©m, Brazil. Focused on halting deforestation." },
  { term: "Samudrayaan", definition: "India's first manned deep ocean mission, sending aquanauts to 6,000m depth." },
  { term: "Article 44", definition: "Directive Principle of State Policy that deals with the Uniform Civil Code (UCC)." },
  { term: "Scurvy", definition: "A disease caused by a deficiency of Vitamin C (Ascorbic Acid)." },
  { term: "Godavari", definition: "The longest river in Peninsular India, also known as the 'Dakshin Ganga'." },
  { term: "Pravasi Bharatiya Divas", definition: "Celebrated on January 9 to mark the contribution of the overseas Indian community." },
  { term: "NITI Aayog", definition: "National Institution for Transforming India. Replaced the Planning Commission in 2015." },
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 150);
  };

  const card = flashcardsData[currentIndex];

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
          {currentIndex + 1} / {flashcardsData.length}
        </div>
      </header>

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
