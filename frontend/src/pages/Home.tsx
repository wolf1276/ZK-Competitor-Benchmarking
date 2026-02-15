import { Link } from 'react-router-dom';
import GlassCard from '../components/shared/GlassCard';
import { getContractInfo } from '../services/contractService';

const features = [
  {
    icon: '🔒',
    title: 'Privacy-Preserving',
    desc: 'Prove KPI rankings without revealing actual numbers using zero-knowledge proofs.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: '📊',
    title: 'Percentile Ranking',
    desc: 'Set and track your industry percentile rank (0–100) on-chain.',
    color: 'var(--accent-violet)',
  },
  {
    icon: '✅',
    title: 'Threshold Verification',
    desc: 'Investors verify your rank exceeds a threshold — without seeing the rank.',
    color: 'var(--accent-emerald)',
  },
  {
    icon: '⛓️',
    title: 'On-Chain State',
    desc: 'Percentile rank is stored on Midnight\'s public ledger with privacy guarantees.',
    color: 'var(--accent-amber)',
  },
];

const steps = [
  { num: '01', title: 'Company sets rank', desc: 'Submit your verified industry percentile rank via ZK proof.', icon: '📈' },
  { num: '02', title: 'Stored on-chain', desc: 'Rank is stored on the Midnight blockchain — value is public.', icon: '🔗' },
  { num: '03', title: 'Investor verifies', desc: 'Investor asks: "Is rank above X?" ZK circuit proves it without revealing the rank.', icon: '🔍' },
];

export default function Home() {
  const contract = getContractInfo();

  return (
    <div className="page">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="container" style={{ textAlign: 'center', paddingTop: 60, paddingBottom: 80 }}>
        <div className="animate-fade-in-up">
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 999,
            fontSize: '0.8rem',
            fontWeight: 600,
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            color: 'var(--accent-cyan)',
            marginBottom: 24,
          }}>
            ⚡ Built on Midnight Network
          </div>
        </div>

        <h1 className="heading-xl animate-fade-in-up" style={{ marginBottom: 20, opacity: 0 }}>
          Prove Your{' '}
          <span className="text-gradient">KPI Rankings</span>
          <br />
          Without Revealing Numbers
        </h1>

        <p className="text-secondary animate-fade-in-up delay-100" style={{
          maxWidth: 640,
          margin: '0 auto 40px',
          fontSize: '1.15rem',
          lineHeight: 1.7,
          opacity: 0,
        }}>
          ZK Competitor Benchmarking lets companies prove their performance percentile
          to investors using zero-knowledge proofs — without exposing raw financial data.
        </p>

        <div className="animate-fade-in-up delay-200" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}>
          <Link to="/company" className="btn btn-primary btn-lg">
            📈 Company Dashboard
          </Link>
          <Link to="/investor" className="btn btn-secondary btn-lg">
            🔍 Investor Verification
          </Link>
        </div>

        {/* Contract Info */}
        <div className="animate-fade-in-up delay-300" style={{ marginTop: 48, opacity: 0 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            fontSize: '0.85rem',
          }}>
            <span className="badge badge-success">Deployed</span>
            <span className="mono text-secondary" style={{ fontSize: '0.8rem' }}>
              {contract.address.slice(0, 8)}...{contract.address.slice(-8)}
            </span>
            <span className="text-muted">|</span>
            <span className="text-muted">{contract.network}</span>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={0.1 * i}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{f.icon}</div>
              <h3 className="heading-md" style={{ marginBottom: 8, color: f.color }}>{f.title}</h3>
              <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <h2 className="heading-lg animate-fade-in-up" style={{ textAlign: 'center', marginBottom: 48 }}>
          How It <span className="text-gradient">Works</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {steps.map((s, i) => (
            <GlassCard key={s.num} delay={0.1 * i} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -14,
                left: 24,
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: 999,
                background: 'var(--gradient-accent)',
                color: 'white',
              }}>
                STEP {s.num}
              </div>
              <div style={{ fontSize: '2rem', marginBottom: 12, marginTop: 8 }}>{s.icon}</div>
              <h3 className="heading-md" style={{ marginBottom: 8 }}>{s.title}</h3>
              <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 60, textAlign: 'center' }}>
        <GlassCard style={{ maxWidth: 700, margin: '0 auto', background: 'var(--gradient-card)' }}>
          <h2 className="heading-lg" style={{ marginBottom: 12 }}>Ready to get started?</h2>
          <p className="text-secondary" style={{ marginBottom: 28, fontSize: '1.05rem' }}>
            Choose your role and interact with the ZK smart contract.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/company" className="btn btn-primary">I'm a Company</Link>
            <Link to="/investor" className="btn btn-secondary">I'm an Investor</Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
