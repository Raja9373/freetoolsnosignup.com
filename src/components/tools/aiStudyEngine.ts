// AI BUZZWORDS & CLICHÉS DICTIONARY (35+ high-frequency generative indicators)
export const AI_BUZZWORDS = [
  'delve', 'embark', 'in today\'s rapidly evolving', 'in today\'s fast-paced', 'leverage',
  'cutting-edge', 'paramount', 'testament', 'tapestry', 'robust',
  'multifaceted', 'underscore', 'beacon', 'pivotal', 'foster',
  'seamless', 'harness', 'plethora', 'realm', 'interplay',
  'ever-evolving', 'crucial role', 'furthermore', 'in conclusion', 'it is worth noting',
  'shed light', 'holistic', 'game-changer', 'dive deep', 'at its core',
  'notably', 'integral', 'moreover', 'spearhead', 'revolutionize',
  'indispensable', 'cornerstone', 'myriad', 'groundbreaking', 'paradigm'
];

// HUMANIZER 100+ SYNONYM REPLACEMENT DICTIONARY
export const HUMANIZER_MAP: Record<string, string> = {
  'delve into': 'explore',
  'delve': 'dig into',
  'embark on': 'start',
  'embark': 'begin',
  'leverage': 'use',
  'leveraging': 'using',
  'cutting-edge': 'modern',
  'paramount': 'crucial',
  'testament to': 'proof of',
  'testament': 'clear sign',
  'tapestry': 'mix',
  'robust': 'solid',
  'multifaceted': 'complex',
  'underscore': 'highlight',
  'underscores': 'highlights',
  'beacon': 'guide',
  'pivotal': 'key',
  'foster': 'build',
  'fosters': 'builds',
  'seamless': 'smooth',
  'seamlessly': 'smoothly',
  'harness': 'use',
  'harnessing': 'using',
  'plethora of': 'plenty of',
  'plethora': 'wealth',
  'realm of': 'field of',
  'realm': 'area',
  'interplay': 'connection',
  'ever-evolving': 'changing',
  'crucial role': 'big role',
  'furthermore': 'also',
  'in conclusion': 'overall',
  'it is worth noting that': 'notably,',
  'shed light on': 'clarify',
  'holistic': 'complete',
  'game-changer': 'major step forward',
  'dive deep': 'examine closely',
  'at its core': 'basically',
  'notably': 'especially',
  'integral': 'essential',
  'moreover': 'plus,',
  'revolutionize': 'transform',
  'indispensable': 'needed',
  'cornerstone': 'foundation',
  'myriad': 'many',
  'groundbreaking': 'innovative',
  'paradigm': 'model',
  'in today\'s rapidly evolving world': 'today',
  'in today\'s fast-paced world': 'nowadays',
  'it is important to remember that': 'remember that',
  'serves as a reminder': 'shows',
  'serves as a testament': 'demonstrates',
  'a myriad of': 'many',
  'utilize': 'use',
  'utilizing': 'using',
  'commence': 'start',
  'facilitate': 'help',
  'subsequently': 'then',
  'consequently': 'as a result',
  'ascertain': 'check',
  'demonstrate': 'show',
  'elucidate': 'explain',
  'exhibit': 'display',
  'implement': 'carry out',
  'manifest': 'appear',
  'necessitate': 'require',
  'predominantly': 'mostly',
  'promulgate': 'announce',
  'scrutinize': 'examine',
  'terminate': 'end',
  'endeavor': 'effort',
  'expeditious': 'fast',
  'inadvertently': 'by mistake',
  'meticulous': 'careful',
  'ubiquitous': 'common',
  'viable': 'workable',
  'virtually': 'almost',
  'with respect to': 'about',
  'in order to': 'to',
  'due to the fact that': 'because',
  'for the purpose of': 'to',
  'in the event that': 'if',
  'prior to': 'before',
  'at this point in time': 'now',
  'has the ability to': 'can',
  'is capable of': 'can',
  'make an assumption': 'assume',
  'give consideration to': 'consider',
  'reach a conclusion': 'conclude'
};

export interface SentenceAnalysis {
  text: string;
  wordCount: number;
  aiProbability: number; // 0-100%
  status: 'human' | 'mixed' | 'ai';
  flaggedKeywords: string[];
}

export interface AIDetectorResult {
  overallAiScore: number; // 0-100% (High = AI, Low = Human)
  burstinessScore: number; // Standard deviation / mean (Human ~ 0.8+, AI ~ <0.4)
  rawBurstinessRatio: number;
  buzzwordScore: number;
  totalSentences: number;
  totalWords: number;
  flaggedBuzzwordsCount: number;
  uniqueBuzzwords: string[];
  sentences: SentenceAnalysis[];
  assessment: string;
}

// 1. REAL AI CONTENT DETECTOR WITH BURSTINESS & SENTENCE HEATMAP
export function analyzeRealAIDetection(text: string): AIDetectorResult {
  if (!text || text.trim().length === 0) {
    return {
      overallAiScore: 0,
      burstinessScore: 0,
      rawBurstinessRatio: 0,
      buzzwordScore: 0,
      totalSentences: 0,
      totalWords: 0,
      flaggedBuzzwordsCount: 0,
      uniqueBuzzwords: [],
      sentences: [],
      assessment: 'Please enter text to analyze.'
    };
  }

  // Split into sentences using punctuation boundaries
  const rawSentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];
  const sentenceList = rawSentences.map(s => s.trim()).filter(s => s.length > 0);

  const words = text.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
  const sentenceLengths: number[] = [];

  const foundBuzzwordsList: string[] = [];

  // Check buzzwords in full text
  const lowerText = text.toLowerCase();
  AI_BUZZWORDS.forEach(bw => {
    const regex = new RegExp(`\\b${bw}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      matches.forEach(() => foundBuzzwordsList.push(bw));
    }
  });

  const uniqueBuzzwords = Array.from(new Set(foundBuzzwordsList));

  // Compute burstiness (Standard deviation / Mean)
  sentenceList.forEach(s => {
    const sw = s.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
    sentenceLengths.push(sw.length);
  });

  const meanLength = sentenceLengths.reduce((a, b) => a + b, 0) / Math.max(1, sentenceLengths.length);
  const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - meanLength, 2), 0) / Math.max(1, sentenceLengths.length);
  const stdDev = Math.sqrt(variance);
  const rawBurstinessRatio = meanLength > 0 ? (stdDev / meanLength) : 0;

  // Burstiness scoring: Low burstiness (<0.45) indicates uniform AI cadence -> High AI score
  // High burstiness (>0.80) indicates varied human cadence -> Low AI score
  let burstinessAiScore = 50;
  if (rawBurstinessRatio < 0.35) {
    burstinessAiScore = 95; // Extremely uniform, typical AI
  } else if (rawBurstinessRatio < 0.50) {
    burstinessAiScore = 80;
  } else if (rawBurstinessRatio < 0.70) {
    burstinessAiScore = 50;
  } else if (rawBurstinessRatio < 0.90) {
    burstinessAiScore = 25;
  } else {
    burstinessAiScore = 10; // Highly variable human cadence
  }

  // Buzzword frequency scoring: Density per 100 words
  const buzzwordDensity = (foundBuzzwordsList.length / Math.max(1, words.length)) * 100;
  const buzzwordScore = Math.min(100, Math.round(buzzwordDensity * 35));

  // Per Sentence Heatmap Analysis
  const sentences: SentenceAnalysis[] = sentenceList.map(s => {
    const sLower = s.toLowerCase();
    const sw = s.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
    const flagged: string[] = [];

    AI_BUZZWORDS.forEach(bw => {
      if (sLower.includes(bw)) {
        flagged.push(bw);
      }
    });

    // Score individual sentence: Length deviation from mean + buzzwords count
    const lenDiff = Math.abs(sw.length - meanLength);
    let sScore = 40;
    if (lenDiff < 3) sScore += 25; // uniform penalty
    if (flagged.length > 0) sScore += flagged.length * 30;

    const finalProb = Math.min(100, Math.max(5, sScore));
    let status: 'human' | 'mixed' | 'ai' = 'human';
    if (finalProb >= 70) status = 'ai';
    else if (finalProb >= 40) status = 'mixed';

    return {
      text: s,
      wordCount: sw.length,
      aiProbability: finalProb,
      status,
      flaggedKeywords: flagged
    };
  });

  // Overall Score = (burstinessScore * 0.50 + buzzwordScore * 0.50)
  const overallAiScore = Math.min(99, Math.max(5, Math.round((burstinessAiScore * 0.50) + (buzzwordScore * 0.50))));

  let assessment = 'Likely Human-Written: Strong sentence variance, natural vocabulary, and minimal generative buzzwords.';
  if (overallAiScore >= 75) {
    assessment = 'High AI Probability (ChatGPT / Claude / Gemini): Highly uniform sentence lengths and multiple AI cliché markers detected.';
  } else if (overallAiScore >= 45) {
    assessment = 'Mixed Content: Contains human elements combined with AI-assisted phrasing or paraphrasing.';
  }

  return {
    overallAiScore,
    burstinessScore: burstinessAiScore,
    rawBurstinessRatio: Math.round(rawBurstinessRatio * 100) / 100,
    buzzwordScore,
    totalSentences: sentenceList.length,
    totalWords: words.length,
    flaggedBuzzwordsCount: foundBuzzwordsList.length,
    uniqueBuzzwords,
    sentences,
    assessment
  };
}

// 2. REAL AI HUMANIZER ENGINE
export function humanizeAIText(text: string, options: { variationLevel?: 'standard' | 'aggressive'; keepMeaning?: boolean } = {}): {
  humanizedText: string;
  changesCount: number;
  replacedTerms: { original: string; replacement: string }[];
} {
  let output = text;
  const replacedTerms: { original: string; replacement: string }[] = [];
  let changesCount = 0;

  // 1. Sort dictionary keys by length descending to match multi-word phrases first
  const sortedPhrases = Object.keys(HUMANIZER_MAP).sort((a, b) => b.length - a.length);

  sortedPhrases.forEach(phrase => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    if (regex.test(output)) {
      const replacement = HUMANIZER_MAP[phrase];
      output = output.replace(regex, (match) => {
        changesCount++;
        // Maintain initial uppercase if original had it
        const isUpper = match[0] === match[0].toUpperCase() && match[0] !== match[0].toLowerCase();
        const adjusted = isUpper ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
        replacedTerms.push({ original: match, replacement: adjusted });
        return adjusted;
      });
    }
  });

  // 2. Clean robotic synthetic transitions
  output = output.replace(/\b(Furthermore|Moreover|In conclusion|It is worth noting that),\s*/gi, '');
  output = output.replace(/\bIn today's (rapidly evolving|fast-paced) world,\s*/gi, 'Today, ');

  // 3. Cadence variation (combine/split some short sentences if aggressive)
  if (options.variationLevel === 'aggressive') {
    output = output.replace(/\. However, /g, '; however, ');
    output = output.replace(/\. Consequently, /g, '—which means ');
  }

  return {
    humanizedText: output,
    changesCount,
    replacedTerms: replacedTerms.slice(0, 20)
  };
}

// 3. REAL ACADEMIC PARAPHRASER
export function paraphraseText(text: string, mode: 'academic' | 'casual' | 'shortened' = 'academic'): string {
  if (!text) return '';

  const academicSynonyms: Record<string, string> = {
    'show': 'demonstrate',
    'shows': 'illustrates',
    'find': 'determine',
    'help': 'facilitate',
    'big': 'substantial',
    'good': 'exemplary',
    'bad': 'adverse',
    'change': 'modify',
    'look at': 'examine',
    'think': 'hypothesize',
    'use': 'utilize',
    'get': 'acquire',
    'make': 'construct',
    'problem': 'challenge'
  };

  const casualSynonyms: Record<string, string> = {
    'utilize': 'use',
    'demonstrate': 'show',
    'facilitate': 'help',
    'substantial': 'huge',
    'exemplary': 'great',
    'hypothesize': 'think',
    'construct': 'build',
    'adversely affect': 'hurt'
  };

  let result = text;
  const dict = mode === 'casual' ? casualSynonyms : academicSynonyms;

  Object.entries(dict).forEach(([orig, syn]) => {
    const regex = new RegExp(`\\b${orig}\\b`, 'gi');
    result = result.replace(regex, (m) => {
      const isCap = m[0] === m[0].toUpperCase();
      return isCap ? syn.charAt(0).toUpperCase() + syn.slice(1) : syn;
    });
  });

  if (mode === 'shortened') {
    result = result.replace(/\b(in order to|due to the fact that|it is evident that)\b/gi, '');
  }

  return result;
}

// 4. REAL EXTRACTIVE SUMMARIZER (Term Frequency Based)
export function extractSalientSummary(text: string, ratio: number = 0.35): { summaryText: string; bulletPoints: string[]; sentenceCount: number } {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];
  const cleanSentences = sentences.map(s => s.trim()).filter(s => s.length > 15);

  if (cleanSentences.length <= 2) {
    return {
      summaryText: text,
      bulletPoints: cleanSentences,
      sentenceCount: cleanSentences.length
    };
  }

  // Calculate Term Frequencies across document
  const words = text.toLowerCase().match(/[a-z]{3,}/g) || [];
  const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'your', 'will', 'about', 'they', 'their', 'which', 'there', 'these']);
  const freq: Record<string, number> = {};

  words.forEach(w => {
    if (!stopWords.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });

  // Score each sentence
  const scored = cleanSentences.map((sent, index) => {
    const sWords = sent.toLowerCase().match(/[a-z]{3,}/g) || [];
    let score = 0;
    sWords.forEach(w => {
      score += (freq[w] || 0);
    });
    // Positional weight: first and last sentences often carry core thesis
    if (index === 0) score *= 1.3;
    if (index === cleanSentences.length - 1) score *= 1.15;
    return { sent, score: score / Math.max(1, sWords.length), index };
  });

  const pickCount = Math.max(1, Math.round(cleanSentences.length * ratio));
  const topSentences = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, pickCount)
    .sort((a, b) => a.index - b.index)
    .map(s => s.sent);

  return {
    summaryText: topSentences.join(' '),
    bulletPoints: topSentences,
    sentenceCount: topSentences.length
  };
}

// 5. REAL CITATION GENERATOR (APA 7th, MLA 9th, Chicago 17th, IEEE)
export interface CitationInput {
  type: 'website' | 'book' | 'journal';
  authorLast: string;
  authorFirst: string;
  title: string;
  publicationName: string;
  year: string;
  urlOrDoi: string;
  volumeIssue?: string;
  pages?: string;
}

export function generateCitation(input: CitationInput, style: 'apa' | 'mla' | 'chicago' | 'ieee'): string {
  const author = input.authorLast && input.authorFirst 
    ? `${input.authorLast}, ${input.authorFirst.charAt(0)}.` 
    : (input.authorLast || 'Author, A.');
  const year = input.year || '2024';
  const title = input.title || 'Untitled Document';
  const pub = input.publicationName || 'Academic Press';
  const url = input.urlOrDoi || '';

  if (style === 'apa') {
    if (input.type === 'journal') {
      return `${author} (${year}). ${title}. ${pub}, ${input.volumeIssue || '12(4)'}, ${input.pages || '45-60'}. ${url ? `https://doi.org/${url}` : ''}`;
    } else if (input.type === 'book') {
      return `${author} (${year}). *${title}*. ${pub}.`;
    }
    return `${author} (${year}). ${title}. ${pub}. ${url}`;
  } else if (style === 'mla') {
    const mlaAuthor = input.authorLast && input.authorFirst ? `${input.authorLast}, ${input.authorFirst}.` : 'Author.';
    if (input.type === 'journal') {
      return `${mlaAuthor} "${title}." *${pub}*, vol. ${input.volumeIssue || '12'}, no. 4, ${year}, pp. ${input.pages || '45-60'}.`;
    }
    return `${mlaAuthor} "${title}." *${pub}*, ${year}, ${url}.`;
  } else if (style === 'ieee') {
    const ieeeAuthor = input.authorFirst && input.authorLast ? `${input.authorFirst.charAt(0)}. ${input.authorLast}` : 'A. Author';
    return `[1] ${ieeeAuthor}, "${title}," *${pub}*, ${input.volumeIssue ? `vol. ${input.volumeIssue}, ` : ''}${year}.`;
  }

  // Chicago
  return `${author} "${title}." *${pub}* (${year}). ${url}`;
}

// 6. REAL READABILITY CALCULATOR (Flesch-Kincaid)
export function calculateReadabilityMetrics(text: string) {
  const words: string[] = text.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
  const sentences: string[] = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];
  
  // Count syllables roughly
  let totalSyllables = 0;
  words.forEach((word: string) => {
    const w = word.toLowerCase().replace(/(?:[^laeiouy]|ed|es|e)$/, '').replace(/^y/, '');
    const syl = (w.match(/[aeiouy]{1,2}/g) || []).length;
    totalSyllables += Math.max(1, syl);
  });

  const totalWords = Math.max(1, words.length);
  const totalSentences = Math.max(1, sentences.length);

  const ASL = totalWords / totalSentences; // Average Sentence Length
  const ASW = totalSyllables / totalWords; // Average Syllables per Word

  // Flesch Reading Ease Formula: 206.835 - (1.015 * ASL) - (84.6 * ASW)
  const fleschEase = Math.min(100, Math.max(0, Math.round(206.835 - (1.015 * ASL) - (84.6 * ASW))));

  // Flesch-Kincaid Grade Level: (0.39 * ASL) + (11.8 * ASW) - 15.59
  const gradeLevel = Math.max(1, Math.round(((0.39 * ASL) + (11.8 * ASW) - 15.59) * 10) / 10);

  return {
    fleschEase,
    gradeLevel,
    totalWords,
    totalSentences,
    totalSyllables,
    readingTimeMinutes: Math.max(1, Math.round(totalWords / 200))
  };
}

// 7. REAL FLASHCARD EXTRACTOR
export interface Flashcard {
  question: string;
  answer: string;
  topic: string;
}

export function extractFlashcardsFromNotes(text: string): Flashcard[] {
  const cards: Flashcard[] = [];
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  lines.forEach(line => {
    // Pattern 1: Concept: Definition or Concept - Definition
    const colonMatch = line.match(/^([^:-]{3,40})[:\-–]\s*(.+)$/);
    if (colonMatch) {
      cards.push({
        topic: 'Concept',
        question: `What is ${colonMatch[1].trim()}?`,
        answer: colonMatch[2].trim()
      });
      return;
    }

    // Pattern 2: "is defined as", "refers to", "means"
    const defMatch = line.match(/^([^,]+?)\s+(?:is defined as|refers to|means)\s+(.+)$/i);
    if (defMatch) {
      cards.push({
        topic: 'Definition',
        question: `Define: ${defMatch[1].trim()}`,
        answer: defMatch[2].trim()
      });
    }
  });

  // Fallback if structured cards not detected
  if (cards.length === 0) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    sentences.slice(0, 4).forEach((s, idx) => {
      cards.push({
        topic: 'Core Idea',
        question: `Key Takeaway #${idx + 1}`,
        answer: s.trim()
      });
    });
  }

  return cards;
}
