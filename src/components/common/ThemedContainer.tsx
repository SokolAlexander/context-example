import { memo, useMemo, ReactNode } from 'react';
import { usePreferencesContext } from '../../context/PreferencesContext';

interface ThemedStyles {
  container: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
}

interface ThemedContainerProps {
  children: ReactNode | ((styles: ThemedStyles) => ReactNode);
  variant?: 'primary' | 'secondary';
}

const ThemedContainer = memo(({ children, variant = 'primary' }: ThemedContainerProps) => {
  const { preferences } = usePreferencesContext();

  const styles = useMemo(() => ({
    container: {
      position: 'relative' as const,
      padding: '20px',
      border: `1px solid ${preferences.theme === 'dark' ? '#444' : '#ccc'}`,
      margin: '10px',
      backgroundColor: preferences.theme === 'dark' ? '#333' : '#f8f8f8',
      transition: 'all 0.3s ease',
    },
    input: {
      padding: '5px',
      marginRight: '10px',
      backgroundColor: preferences.theme === 'dark' ? '#444' : '#fff',
      border: `1px solid ${preferences.theme === 'dark' ? '#555' : '#ccc'}`,
      color: preferences.theme === 'dark' ? '#fff' : '#000',
    },
    button: {
      padding: '5px 10px',
      backgroundColor: preferences.theme === 'dark' 
        ? (variant === 'primary' ? '#0056b3' : '#1e7e34')
        : (variant === 'primary' ? '#007bff' : '#28a745'),
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }
  }), [preferences.theme, variant]);

  return (
    <div style={styles.container}>
      {typeof children === 'function' ? children(styles) : children}
    </div>
  );
});

ThemedContainer.displayName = 'ThemedContainer';

export type { ThemedStyles };
export default ThemedContainer; 
