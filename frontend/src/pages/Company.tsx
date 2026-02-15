import { useState } from 'react';
import GlassCard from '../components/shared/GlassCard';
import StatusBadge from '../components/shared/StatusBadge';
import { useWallet } from '../context/WalletContext';
import { setPercentile, getCurrentRank, getContractInfo, type TxResult } from '../services/contractService';

export default function Company() {
  const { isConnected, connect } = useWallet();
  const [percentile, setPercentileValue] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<TxResult | null>(null);
  const contract = getContractInfo();

  const handleSubmit = async () => {
    if (!isConnected) {
      connect();
      return;
    }
    setIsSubmitting(true);
    setResult(null);
    try {
      const res = await setPercentile(percentile);
      setResult(res);
    } catch {
      setResult({ success: false, txHash: '', message: 'Transaction failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentRank = getCurrentRank();

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="animate-fade-in-up" style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 999,
            fontSize: '0.8rem',
            fontWeight: 600,
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            color: 'var(--accent-violet)',
            marginBottom: 16,
          }}>
            📈 Company Dashboard
          </div>
          <h1 className="heading-lg">Set Your Percentile Rank</h1>
          <p className="text-secondary" style={{ marginTop: 8, maxWidth: 600 }}>
            Submit your verified industry percentile rank to the blockchain using a zero-knowledge proof.
            Only the rank value is stored on-chain — your raw KPI data remains private.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
          {/* ── Set Percentile Card ────────────────────── */}
          <GlassCard delay={0.1}>
            <h2 className="heading-md" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🎯</span> Set Percentile
            </h2>

            {/* Slider */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Percentile Rank</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 56,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--gradient-accent)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}>
                  {percentile}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={percentile}
                onChange={(e) => setPercentileValue(Number(e.target.value))}
                className="range-slider"
                disabled={isSubmitting}
                id="percentile-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>0 — Lowest</span>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>100 — Top</span>
              </div>
            </div>

            {/* Interpretation */}
            <div style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(6, 182, 212, 0.06)',
              border: '1px solid rgba(6, 182, 212, 0.12)',
              marginBottom: 24,
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
            }}>
              Setting to <strong style={{ color: 'var(--accent-cyan)' }}>{percentile}</strong>{' '}
              means your company is in the <strong style={{ color: 'var(--accent-emerald)' }}>top {100 - percentile}%</strong> of the industry.
            </div>

            {/* Submit */}
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              id="submit-percentile-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  Generating ZK Proof...
                </>
              ) : !isConnected ? (
                '🔗 Connect Wallet First'
              ) : (
                '🚀 Submit Proof to Blockchain'
              )}
            </button>

            {/* Result */}
            {result && (
              <div className="animate-fade-in" style={{ marginTop: 20 }}>
                <StatusBadge variant={result.success ? 'success' : 'error'}>
                  {result.success ? 'Transaction Confirmed' : 'Transaction Failed'}
                </StatusBadge>
                <p style={{ marginTop: 12, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {result.message}
                </p>
                {result.txHash && (
                  <p className="mono" style={{
                    marginTop: 8,
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    wordBreak: 'break-all',
                  }}>
                    TX: {result.txHash}
                  </p>
                )}
              </div>
            )}
          </GlassCard>

          {/* ── Status Card ────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <GlassCard delay={0.2}>
              <h2 className="heading-md" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📊</span> On-Chain Status
              </h2>

              {/* Current Rank Display */}
              <div style={{
                textAlign: 'center',
                padding: '32px 0',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-card)',
                marginBottom: 20,
              }}>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  <span className="text-gradient">{currentRank}</span>
                </div>
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  Current Percentile Rank
                </span>
              </div>

              {/* Info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-glass)',
                }}>
                  <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: 4 }}>Network</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{contract.network}</div>
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-glass)',
                }}>
                  <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: 4 }}>Circuit</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>setPercentile</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={0.3} style={{ background: 'var(--gradient-card)' }}>
              <h3 className="heading-md" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>💡</span> How it works
              </h3>
              <ol style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 2 }}>
                <li>Enter your industry percentile rank (0–100)</li>
                <li>A ZK proof is generated client-side</li>
                <li>The proof is submitted to the Midnight contract</li>
                <li>Your rank is stored on-chain — raw data stays private</li>
              </ol>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
