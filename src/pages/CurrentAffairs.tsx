import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { currentAffairsData } from "../data/currentAffairs";
import { ChevronDown, ChevronUp, Calendar, BookOpen, CircleCheck, Circle } from "lucide-react";
import { cn } from "../lib/utils";
import { getCurrentAffairTopicKey, getTotalCurrentAffairTopics } from "../lib/currentAffairs";
import { useStudyProgress } from "../lib/studyProgress";

export default function CurrentAffairs() {
  const { progress, toggleCurrentAffairTopic } = useStudyProgress();
  const [expandedMonth, setExpandedMonth] = useState<string | null>(currentAffairsData[0].month);

  const completedCount = Object.keys(progress.currentAffairsTopicReview).length;
  const totalTopics = getTotalCurrentAffairTopics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20 md:pb-0"
    >
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          Current Affairs
        </h2>
        <p className="text-slate-500 mt-2">Comprehensive coverage of the last 15 months (Jan 2025 - Mar 2026).</p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
          Progress: {completedCount}/{totalTopics} topics revised
        </div>
      </header>

      <div className="space-y-4">
        {currentAffairsData.map((data, idx) => {
          const isExpanded = expandedMonth === data.month;
          const monthCompleted = data.topics.reduce((count, _topic, topicIdx) => {
            const key = getCurrentAffairTopicKey(data.month, topicIdx);
            return progress.currentAffairsTopicReview[key] ? count + 1 : count;
          }, 0);

          return (
            <motion.div
              key={idx}
              layout
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setExpandedMonth(isExpanded ? null : data.month)}
                className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{data.month}</h3>
                    <p className="text-xs text-slate-500">{monthCompleted}/{data.topics.length} revised</p>
                  </div>
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
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                              {topic.category}
                            </span>
                            <h4 className="text-base font-bold text-slate-900">{topic.title}</h4>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed pl-1">
                            {topic.content}
                          </p>
                          <button
                            onClick={() => toggleCurrentAffairTopic(getCurrentAffairTopicKey(data.month, tIdx))}
                            className={cn(
                              "flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors",
                              progress.currentAffairsTopicReview[getCurrentAffairTopicKey(data.month, tIdx)]
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
                            )}
                          >
                            {progress.currentAffairsTopicReview[getCurrentAffairTopicKey(data.month, tIdx)] ? (
                              <CircleCheck className="w-4 h-4" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                            Mark as revised
                          </button>
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
