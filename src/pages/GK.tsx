import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gkData } from "../data/gk";
import { ChevronDown, ChevronUp, GraduationCap, Book } from "lucide-react";
import { cn } from "../lib/utils";

export default function GK() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(gkData[0].category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20 md:pb-0"
    >
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-purple-600" />
          Static General Knowledge
        </h2>
        <p className="text-slate-500 mt-2">Core subjects for MHCET 5-Year LLB exam.</p>
      </header>

      <div className="space-y-4">
        {gkData.map((data, idx) => {
          const isExpanded = expandedCategory === data.category;
          return (
            <motion.div
              key={idx}
              layout
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : data.category)}
                className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Book className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{data.category}</h3>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-200"
                  >
                    <div className="p-5 space-y-6">
                      {data.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="space-y-2">
                          <h4 className="text-base font-bold text-slate-900">{topic.title}</h4>
                          <p className="text-slate-600 text-sm leading-relaxed pl-1">
                            {topic.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
