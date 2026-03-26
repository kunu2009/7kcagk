import { motion } from "motion/react";
import { syllabusData } from "../data/syllabus";
import { FileText, CheckCircle2, Lightbulb } from "lucide-react";

export default function Syllabus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20 md:pb-0"
    >
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <FileText className="w-8 h-8 text-emerald-600" />
          Syllabus & Strategy
        </h2>
        <p className="text-slate-500 mt-2">{syllabusData.description}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {syllabusData.topics.map((topic, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.01 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">{topic.category}</h3>
              <p className="text-sm text-slate-500">{topic.details}</p>
            </div>
            <ul className="space-y-3">
              {topic.subtopics.map((sub, sIdx) => (
                <li key={sIdx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 leading-relaxed">{sub}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8 text-amber-600" />
          <h3 className="text-2xl font-bold text-amber-900">Preparation Tips</h3>
        </div>
        <ul className="space-y-4">
          {syllabusData.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-white/50 p-4 rounded-xl border border-amber-100">
              <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold shrink-0">
                {idx + 1}
              </div>
              <span className="text-amber-900 font-medium">{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}
