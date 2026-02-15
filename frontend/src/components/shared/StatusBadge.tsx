interface StatusBadgeProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
}

export default function StatusBadge({ variant, children }: StatusBadgeProps) {
  const icons: Record<string, string> = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <span className={`badge badge-${variant}`}>
      <span>{icons[variant]}</span>
      {children}
    </span>
  );
}
