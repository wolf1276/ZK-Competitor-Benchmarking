import { NavLink } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';

const navStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  background: 'rgba(10, 14, 26, 0.8)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  padding: '0 24px',
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 64,
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: '1.1rem',
  fontWeight: 700,
  color: 'var(--text-primary)',
  textDecoration: 'none',
};

const linksStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  listStyle: 'none',
};

const linkBase: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.9rem',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
};

const walletBtnStyle: React.CSSProperties = {
  padding: '8px 20px',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.3s ease',
};

export default function Navbar() {
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <NavLink to="/" style={logoStyle}>
          <span style={{ fontSize: '1.5rem' }}>🔐</span>
          <span>ZK Bench</span>
        </NavLink>

        <ul style={linksStyle}>
          <li>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                ...linkBase,
                color: isActive ? 'var(--accent-cyan)' : linkBase.color,
                background: isActive ? 'rgba(6,182,212,0.1)' : 'transparent',
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/company"
              style={({ isActive }) => ({
                ...linkBase,
                color: isActive ? 'var(--accent-cyan)' : linkBase.color,
                background: isActive ? 'rgba(6,182,212,0.1)' : 'transparent',
              })}
            >
              Company
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/investor"
              style={({ isActive }) => ({
                ...linkBase,
                color: isActive ? 'var(--accent-cyan)' : linkBase.color,
                background: isActive ? 'rgba(6,182,212,0.1)' : 'transparent',
              })}
            >
              Investor
            </NavLink>
          </li>
        </ul>

        <button
          onClick={isConnected ? disconnect : connect}
          style={{
            ...walletBtnStyle,
            background: isConnected
              ? 'rgba(16, 185, 129, 0.15)'
              : 'var(--gradient-accent)',
            color: isConnected ? 'var(--accent-emerald)' : 'white',
            border: isConnected ? '1px solid rgba(16, 185, 129, 0.3)' : 'none',
          }}
        >
          {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : '🔗 Connect Wallet'}
        </button>
      </div>
    </nav>
  );
}
