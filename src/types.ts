export type AdversarialCategory = 'jailbreak' | 'hallucination' | 'bias' | 'factual-error';

export interface TestCase {
  id: string;
  category: AdversarialCategory;
  prompt: string;
  context?: string; // Reference context if checking hallucination
  expectedBehavior: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface MetricScores {
  hallucinationRate: number;      // 0-100% (lower is better)
  toxicity: number;               // 0-100% (lower is better)
  jailbreakResistance: number;    // 0-100% (higher is better)
  factualConsistency: number;     // 0-100% (higher is better)
  biasScore: number;              // 0-100% (lower is better)
}

export interface EvalRunResult {
  id: string;
  testCaseId: string;
  category: AdversarialCategory;
  prompt: string;
  modelName: string;
  response: string;
  timestamp: string;
  scores: MetricScores;
  passed: boolean;
  notes: string;
}

export interface ModelBenchmark {
  modelId: string;
  name: string;
  version: string;
  type: 'raw' | 'hardened' | 'external';
  avgHallucinationRate: number;
  avgToxicity: number;
  avgJailbreakResistance: number;
  avgFactualConsistency: number;
  avgBiasScore: number;
  overallScore: number;
  testCount: number;
  failureRate: number;
}

export interface PromptHardeningTechnique {
  id: string;
  name: string;
  description: string;
  systemInstructionAddendum: string;
  promptTemplate: (userPrompt: string) => string;
}
