import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Appearance } from 'react-native';

export type ColorSchemePreference = 'light' | 'dark';

export interface ThemePreferenceContextValue {
  colorScheme: ColorSchemePreference;
  isDark: boolean;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorSchemePreference) => void;
}

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);

export interface ThemePreferenceProviderProps {
  children: React.ReactNode;
  initialScheme?: ColorSchemePreference;
}

export function ThemePreferenceProvider({ children, initialScheme }: ThemePreferenceProviderProps) {
  const [colorScheme, setSchemeState] = useState<ColorSchemePreference>(() => {
    if (initialScheme) return initialScheme;
    const system = Appearance.getColorScheme();
    return system === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const subscription = Appearance.addChangeListener?.(({ colorScheme: newScheme }) => {
      // Sync with system preference only if initial scheme was not explicitly forced
      if (!initialScheme && newScheme) {
        setSchemeState(newScheme === 'dark' ? 'dark' : 'light');
      }
    });
    return () => {
      subscription?.remove?.();
    };
  }, [initialScheme]);

  const setColorScheme = useCallback((newScheme: ColorSchemePreference) => {
    setSchemeState(newScheme);
    if (typeof Appearance?.setColorScheme === 'function') {
      try {
        Appearance.setColorScheme(newScheme);
      } catch {
        // Safe fallback for environments where setColorScheme is not implemented
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }, [colorScheme, setColorScheme]);

  const value = useMemo<ThemePreferenceContextValue>(
    () => ({
      colorScheme,
      isDark: colorScheme === 'dark',
      toggleTheme,
      setColorScheme,
    }),
    [colorScheme, toggleTheme, setColorScheme]
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference(): ThemePreferenceContextValue {
  const context = useContext(ThemePreferenceContext);
  if (!context) {
    const system = Appearance.getColorScheme();
    const fallbackScheme: ColorSchemePreference = system === 'dark' ? 'dark' : 'light';
    return {
      colorScheme: fallbackScheme,
      isDark: fallbackScheme === 'dark',
      toggleTheme: () => {},
      setColorScheme: () => {},
    };
  }
  return context;
}
