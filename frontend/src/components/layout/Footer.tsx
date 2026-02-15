const footerStyle: React.CSSProperties = {
  borderTop: '1px solid rgba(255,255,255,0.06)',
  padding: '32px 24px',
  textAlign: 'center',
  color: 'var(--text-muted)',
  fontSize: '0.85rem',
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ marginBottom: 8 }}>
          Built with ❤️ on{' '}
          <a href="https://midnight.network" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)' }}>
            Midnight Network
          </a>
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Privacy is not a feature — it's a right.
        </p>
      </div>
    </footer>
  );
}
