import { currentAffairsData } from "../data/currentAffairs";

export function getCurrentAffairTopicKey(month: string, topicIndex: number) {
  return `${month}::${topicIndex}`;
}

export function getTotalCurrentAffairTopics() {
  return currentAffairsData.reduce((sum, month) => sum + month.topics.length, 0);
}
