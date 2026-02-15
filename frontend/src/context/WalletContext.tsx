import { createContext, useContext, useState, type ReactNode } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletState>({
  isConnected: false,
  address: null,
  connect: () => {},
  disconnect: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useWallet() {
  return useContext(WalletContext);
}

function generateMockAddress(): string {
  const chars = '0123456789abcdef';
  let addr = '';
  for (let i = 0; i < 64; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = () => {
    const mockAddr = generateMockAddress();
    setAddress(mockAddr);
    setIsConnected(true);
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}
