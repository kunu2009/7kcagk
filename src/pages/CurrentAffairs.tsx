import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { currentAffairsData } from "../data/currentAffairs";
import { ChevronDown, ChevronUp, Calendar, BookOpen, CircleCheck, Circle, Newspaper } from "lucide-react";
import { cn } from "../lib/utils";
import { getCurrentAffairTopicKey, getTotalCurrentAffairTopics } from "../lib/currentAffairs";
import { useStudyProgress } from "../lib/studyProgress";

export default function CurrentAffairs() {
  const { progress, toggleCurrentAffairTopic } = useStudyProgress();
  const [expandedMonth, setExpandedMonth] = useState<string | null>(currentAffairsData[0].month);
  const [selectedNewsType, setSelectedNewsType] = useState("All Types");

  const completedCount = Object.keys(progress.currentAffairsTopicReview).length;
  const totalTopics = getTotalCurrentAffairTopics();
  const newsTypes = useMemo(() => {
    const types = new Set(currentAffairsData.flatMap((m) => m.topics.map((t) => t.newsType)));
    return ["All Types", ...Array.from(types)];
  }, []);

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
        <div className="mt-3 max-w-xs">
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Filter by News Type</label>
          <select
            value={selectedNewsType}
            onChange={(e) => setSelectedNewsType(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white text-slate-700"
          >
            {newsTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="space-y-4">
        {currentAffairsData.map((data, idx) => {
          const topicEntries = data.topics
            .map((topic, topicIdx) => ({ topic, topicIdx }))
            .filter(({ topic }) => selectedNewsType === "All Types" || topic.newsType === selectedNewsType);

          if (!topicEntries.length) return null;

          const isExpanded = expandedMonth === data.month;
          const monthCompleted = topicEntries.reduce((count, { topicIdx }) => {
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
                    <p className="text-xs text-slate-500">{monthCompleted}/{topicEntries.length} revised</p>
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
                      {topicEntries.map(({ topic, topicIdx }) => (
                        <div key={topicIdx} className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                              {new Date(topic.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                              {topic.category}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 flex items-center gap-1">
                              <Newspaper className="w-3 h-3" /> {topic.newsType}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-base font-bold text-slate-900">{topic.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {topic.content}
                            </p>
                          </div>
                          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Key Highlights</p>
                            <ul className="space-y-1">
                              {topic.keyPoints.map((point, pIdx) => (
                                <li key={pIdx} className="text-sm text-slate-600 leading-relaxed list-disc ml-5">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-2">
                            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Why It Matters</p>
                            <p className="text-sm text-amber-900 leading-relaxed">{topic.whyItMatters}</p>
                            <p className="text-xs text-amber-800 font-medium">{topic.examFocus}</p>
                          </div>
                          <button
                            onClick={() => toggleCurrentAffairTopic(getCurrentAffairTopicKey(data.month, topicIdx))}
                            className={cn(
                              "flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors",
                              progress.currentAffairsTopicReview[getCurrentAffairTopicKey(data.month, topicIdx)]
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
                            )}
                          >
                            {progress.currentAffairsTopicReview[getCurrentAffairTopicKey(data.month, topicIdx)] ? (
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
