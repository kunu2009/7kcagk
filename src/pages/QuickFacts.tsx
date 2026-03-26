import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { PlaySquare, Heart, Share2, MessageCircle } from "lucide-react";
import { cn } from "../lib/utils";

const factsData = [
  {
    id: 1,
    title: "The Heart & Soul of the Constitution",
    content: "Did you know? Dr. B.R. Ambedkar called Article 32 the 'heart and soul' of the Indian Constitution. It guarantees the right to move the Supreme Court for the enforcement of Fundamental Rights.",
    category: "Polity",
    color: "bg-blue-600"
  },
  {
    id: 2,
    title: "India's First Manned Deep Ocean Mission",
    content: "'Samudrayaan' is India's first manned deep ocean mission. It aims to send three aquanauts to a depth of 6,000 meters in the Indian Ocean to study deep-sea resources and biodiversity.",
    category: "Science & Tech",
    color: "bg-emerald-600"
  },
  {
    id: 3,
    title: "The Longest River in Peninsular India",
    content: "The Godavari is the longest river in Peninsular India and is also known as the 'Dakshin Ganga'. It originates in Trimbakeshwar, Maharashtra.",
    category: "Geography",
    color: "bg-amber-600"
  },
  {
    id: 4,
    title: "The First Battle of Panipat",
    content: "Fought in 1526 between Babur and Ibrahim Lodi, the First Battle of Panipat marked the beginning of the Mughal Empire in India.",
    category: "History",
    color: "bg-rose-600"
  },
  {
    id: 5,
    title: "What is Repo Rate?",
    content: "Repo Rate (Repurchasing Option Rate) is the rate at which the Reserve Bank of India (RBI) lends short-term money to commercial banks to control inflation and liquidity.",
    category: "Economy",
    color: "bg-purple-600"
  }
];

export default function QuickFacts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPosition = containerRef.current.scrollTop;
    const itemHeight = containerRef.current.clientHeight;
    const newIndex = Math.round(scrollPosition / itemHeight);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex]);

  return (
    <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-64px)] -m-4 md:-m-8 bg-black overflow-hidden relative">
      <header className="absolute top-0 inset-x-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <PlaySquare className="w-6 h-6 text-rose-500" />
          Quick Facts
        </h2>
        <span className="text-xs font-medium text-white/70 bg-black/40 px-2 py-1 rounded-full">
          Scroll for more
        </span>
      </header>

      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {factsData.map((fact, idx) => (
          <div 
            key={fact.id} 
            className={cn(
              "h-full w-full snap-start snap-always flex items-center justify-center p-6 relative",
              fact.color
            )}
          >
            <div className="absolute inset-0 bg-black/20" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 max-w-md w-full text-center space-y-6"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm">
                {fact.category}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                {fact.title}
              </h3>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md font-medium">
                {fact.content}
              </p>
            </motion.div>

            <div className="absolute right-4 bottom-24 md:bottom-12 flex flex-col gap-6 z-20">
              <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
