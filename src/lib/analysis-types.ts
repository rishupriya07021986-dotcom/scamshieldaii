export type ThreatLevel = "safe" | "low" | "medium" | "high" | "critical";

export interface ManipulationTactic {
  name: string;
  severity: "low" | "medium" | "high";
  evidence: string;
}

export interface AnalysisResult {
  scamProbability: number;
  threatLevel: ThreatLevel;
  scamCategory: string;
  manipulationTactics: ManipulationTactic[];
  suspiciousIndicators: string[];
  explanation: string;
  safetyAdvice: string[];
}
