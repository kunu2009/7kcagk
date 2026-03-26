import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mhcet-prep-progress-v1";

export type FlashcardReviewQuality = "again" | "good" | "easy";

export type FlashcardSchedule = {
  repetitions: number;
  ease: number;
  intervalDays: number;
  dueAt: string;
  lastReviewedAt: string;
};

export type QuizProgress = {
  sessions: number;
  totalAttempted: number;
  totalCorrect: number;
  lastSessionAt?: string;
};

export type StudyProgress = {
  currentAffairsTopicReview: Record<string, string>;
  flashcards: Record<string, FlashcardSchedule>;
  quiz: QuizProgress;
  updatedAt: string;
};

const defaultProgress: StudyProgress = {
  currentAffairsTopicReview: {},
  flashcards: {},
  quiz: {
    sessions: 0,
    totalAttempted: 0,
    totalCorrect: 0,
  },
  updatedAt: new Date(0).toISOString(),
};

function safeNowIso() {
  return new Date().toISOString();
}

function loadProgress(): StudyProgress {
  if (typeof window === "undefined") return defaultProgress;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;

    const parsed = JSON.parse(raw) as Partial<StudyProgress>;

    return {
      currentAffairsTopicReview: parsed.currentAffairsTopicReview ?? {},
      flashcards: parsed.flashcards ?? {},
      quiz: {
        sessions: parsed.quiz?.sessions ?? 0,
        totalAttempted: parsed.quiz?.totalAttempted ?? 0,
        totalCorrect: parsed.quiz?.totalCorrect ?? 0,
        lastSessionAt: parsed.quiz?.lastSessionAt,
      },
      updatedAt: parsed.updatedAt ?? safeNowIso(),
    };
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: StudyProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getNextFlashcardSchedule(
  previous: FlashcardSchedule | undefined,
  quality: FlashcardReviewQuality,
): FlashcardSchedule {
  const now = new Date();
  const prevEase = previous?.ease ?? 2.5;
  const prevRepetitions = previous?.repetitions ?? 0;
  const prevInterval = previous?.intervalDays ?? 0;

  let repetitions = prevRepetitions;
  let ease = prevEase;
  let intervalDays = 1;

  if (quality === "again") {
    repetitions = 0;
    ease = Math.max(1.3, prevEase - 0.2);
    intervalDays = 1;
  } else if (quality === "good") {
    repetitions = prevRepetitions + 1;
    ease = Math.max(1.3, prevEase);
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.max(1, Math.round(prevInterval * ease));
  } else {
    repetitions = prevRepetitions + 1;
    ease = Math.max(1.3, prevEase + 0.05);
    if (repetitions === 1) intervalDays = 2;
    else if (repetitions === 2) intervalDays = 5;
    else intervalDays = Math.max(1, Math.round(prevInterval * (ease + 0.15)));
  }

  const dueDate = new Date(now);
  dueDate.setDate(now.getDate() + intervalDays);

  return {
    repetitions,
    ease,
    intervalDays,
    dueAt: dueDate.toISOString(),
    lastReviewedAt: now.toISOString(),
  };
}

export function getDueFlashcardIds(progress: StudyProgress, cardIds: string[], at = new Date()) {
  return cardIds.filter((id) => {
    const schedule = progress.flashcards[id];
    if (!schedule) return true;
    return new Date(schedule.dueAt).getTime() <= at.getTime();
  });
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgress>(defaultProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
  }, []);

  const update = useCallback((updater: (current: StudyProgress) => StudyProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      const withTimestamp = { ...next, updatedAt: safeNowIso() };
      saveProgress(withTimestamp);
      return withTimestamp;
    });
  }, []);

  const toggleCurrentAffairTopic = useCallback((topicKey: string) => {
    update((current) => {
      const nextReview = { ...current.currentAffairsTopicReview };
      if (nextReview[topicKey]) {
        delete nextReview[topicKey];
      } else {
        nextReview[topicKey] = safeNowIso();
      }

      return {
        ...current,
        currentAffairsTopicReview: nextReview,
      };
    });
  }, [update]);

  const markQuizSession = useCallback((correct: number, attempted: number) => {
    update((current) => ({
      ...current,
      quiz: {
        sessions: current.quiz.sessions + 1,
        totalAttempted: current.quiz.totalAttempted + attempted,
        totalCorrect: current.quiz.totalCorrect + correct,
        lastSessionAt: safeNowIso(),
      },
    }));
  }, [update]);

  const reviewFlashcard = useCallback((cardId: string, quality: FlashcardReviewQuality) => {
    update((current) => ({
      ...current,
      flashcards: {
        ...current.flashcards,
        [cardId]: getNextFlashcardSchedule(current.flashcards[cardId], quality),
      },
    }));
  }, [update]);

  const metrics = useMemo(() => {
    const caCompleted = Object.keys(progress.currentAffairsTopicReview).length;
    const quizAccuracy = progress.quiz.totalAttempted
      ? Math.round((progress.quiz.totalCorrect / progress.quiz.totalAttempted) * 100)
      : 0;

    return {
      caCompleted,
      quizAccuracy,
      totalQuizAttempted: progress.quiz.totalAttempted,
      totalQuizCorrect: progress.quiz.totalCorrect,
      quizSessions: progress.quiz.sessions,
    };
  }, [progress]);

  return {
    progress,
    metrics,
    loaded,
    toggleCurrentAffairTopic,
    markQuizSession,
    reviewFlashcard,
  };
}
