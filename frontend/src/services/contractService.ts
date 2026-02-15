// ============================================================
// Contract Service — Mock Implementation
// Simulates interactions with the ZKCompetitorBenchmarking contract.
// Replace with real Midnight SDK calls when integrating with Lace wallet.
// ============================================================

const CONTRACT_ADDRESS = 'a4fa7fa393f72a8615961e126e2ff821d47963f3fea9c64f0d494e3366d15643';
const NETWORK = 'undeployed';

// In-memory state (simulates on-chain percentile rank)
let currentPercentileRank = 0;

// Simulate blockchain transaction delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getContractInfo() {
  return {
    address: CONTRACT_ADDRESS,
    network: NETWORK,
    deployedAt: '2026-02-15',
  };
}

export function getCurrentRank(): number {
  return currentPercentileRank;
}

export interface TxResult {
  success: boolean;
  txHash: string;
  message: string;
}

export interface ProofResult {
  success: boolean;
  threshold: number;
  passed: boolean;
  message: string;
}

/**
 * Simulates the setPercentile circuit call.
 * In production, this would submit a ZK transaction through
 * the wallet to the Midnight contract.
 */
export async function setPercentile(value: number): Promise<TxResult> {
  if (value < 0 || value > 100) {
    return {
      success: false,
      txHash: '',
      message: 'Percentile must be between 0 and 100',
    };
  }

  // Simulate ZK proof generation + blockchain confirmation
  await delay(2000 + Math.random() * 1500);

  // The contract uses Counter.increment(), so we simulate that
  currentPercentileRank = value;

  const txHash = Array.from({ length: 64 }, () =>
    '0123456789abcdef'[Math.floor(Math.random() * 16)]
  ).join('');

  return {
    success: true,
    txHash,
    message: `Percentile rank set to ${value}. ZK proof verified on-chain.`,
  };
}

/**
 * Simulates the proveAbove circuit call.
 * In production, the ZK circuit would fail (underflow) if rank <= threshold.
 */
export async function proveAbove(threshold: number): Promise<ProofResult> {
  // Simulate ZK proof verification time
  await delay(1500 + Math.random() * 1000);

  const passed = currentPercentileRank > threshold;

  return {
    success: true,
    threshold,
    passed,
    message: passed
      ? `✅ Proof verified: Company rank exceeds the ${threshold}th percentile (top ${100 - threshold}%)`
      : `❌ Proof failed: Company rank does not exceed the ${threshold}th percentile`,
  };
}
