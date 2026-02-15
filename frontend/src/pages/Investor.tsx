import { useState } from 'react';
import GlassCard from '../components/shared/GlassCard';
import StatusBadge from '../components/shared/StatusBadge';
import { useWallet } from '../context/WalletContext';
import { proveAbove, getContractInfo, type ProofResult } from '../services/contractService';

export default function Investor() {
  const { isConnected, connect } = useWallet();
  const [threshold, setThreshold] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<ProofResult | null>(null);
  const contract = getContractInfo();

  const handleVerify = async () => {
    if (!isConnected) {
      connect();
      return;
    }
    const val = Number(threshold);
    if (isNaN(val) || val < 0 || val > 100) return;

    setIsVerifying(true);
    setResult(null);
    try {
      const res = await proveAbove(val);
      setResult(res);
    } catch {
      setResult({
        success: false,
        threshold: val,
        passed: false,
        message: 'Verification failed. Please try again.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

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
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            color: 'var(--accent-emerald)',
            marginBottom: 16,
          }}>
            🔍 Investor Dashboard
          </div>
          <h1 className="heading-lg">Verify Company Ranking</h1>
          <p className="text-secondary" style={{ marginTop: 8, maxWidth: 600 }}>
            Check if a company's industry percentile rank exceeds your required threshold
            using a zero-knowledge proof. The actual rank value is never revealed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
          {/* ── Verify Card ────────────────────────────── */}
          <GlassCard delay={0.1}>
            <h2 className="heading-md" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🔎</span> Proof Verification
            </h2>

            {/* Threshold Input */}
            <div style={{ marginBottom: 20 }}>
              <label className="text-secondary" style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>
                Minimum Percentile Threshold
              </label>
              <input
                type="number"
                className="input"
                placeholder="e.g. 80 (proves top 20%)"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                min={0}
                max={100}
                disabled={isVerifying}
                id="threshold-input"
              />
            </div>

            {/* Interpretation */}
            {threshold && Number(threshold) >= 0 && Number(threshold) <= 100 && (
              <div style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.12)',
                marginBottom: 24,
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
              }}>
                Testing if the company is in the{' '}
                <strong style={{ color: 'var(--accent-emerald)' }}>
                  top {100 - Number(threshold)}%
                </strong>{' '}
                of the industry (rank &gt; {threshold}).
              </div>
            )}

            {/* Verify Button */}
            <button
              className="btn btn-success"
              style={{ width: '100%' }}
              onClick={handleVerify}
              disabled={isVerifying || (!isConnected ? false : !threshold || Number(threshold) < 0 || Number(threshold) > 100)}
              id="verify-btn"
            >
              {isVerifying ? (
                <>
                  <div className="spinner" />
                  Verifying ZK Proof...
                </>
              ) : !isConnected ? (
                '🔗 Connect Wallet First'
              ) : (
                '🔍 Run ZK Verification'
              )}
            </button>

            {/* Result */}
            {result && (
              <div className="animate-fade-in" style={{
                marginTop: 24,
                padding: 24,
                borderRadius: 'var(--radius-md)',
                background: result.passed
                  ? 'rgba(16, 185, 129, 0.06)'
                  : 'rgba(244, 63, 94, 0.06)',
                border: `1px solid ${result.passed
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'rgba(244, 63, 94, 0.2)'}`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>
                  {result.passed ? '✅' : '❌'}
                </div>
                <StatusBadge variant={result.passed ? 'success' : 'error'}>
                  {result.passed ? 'Proof Passed' : 'Proof Failed'}
                </StatusBadge>
                <p style={{
                  marginTop: 16,
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {result.message}
                </p>
              </div>
            )}
          </GlassCard>

          {/* ── Info Cards ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <GlassCard delay={0.2}>
              <h2 className="heading-md" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🔐</span> What is Zero-Knowledge?
              </h2>
              <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 16 }}>
                A zero-knowledge proof lets you verify a statement is <strong style={{ color: 'var(--text-primary)' }}>true</strong>{' '}
                without learning <strong style={{ color: 'var(--text-primary)' }}>anything else</strong>. In this case:
              </p>
              <div style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-card)',
                border: '1px solid var(--border-glass)',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}>
                "The company's rank is above your threshold"
                <br />
                →   without revealing <em>what the rank actually is</em>.
              </div>
            </GlassCard>

            <GlassCard delay={0.3}>
              <h2 className="heading-md" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>⚙️</span> Technical Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Circuit', value: 'proveAbove(threshold: Field)' },
                  { label: 'Method', value: 'Subtraction-underflow pattern' },
                  { label: 'Contract', value: `${contract.address.slice(0, 12)}...` },
                  { label: 'Network', value: contract.network },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-glass)',
                  }}>
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>{item.label}</span>
                    <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
