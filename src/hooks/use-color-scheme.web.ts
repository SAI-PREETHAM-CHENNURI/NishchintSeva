import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useThemePreference } from '@/context/theme-context';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme(): 'light' | 'dark' {
  const preference = useThemePreference();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (preference?.colorScheme) {
    return preference.colorScheme;
  }

  const colorScheme = useRNColorScheme();

  if (hasHydrated && colorScheme) {
    return colorScheme === 'dark' ? 'dark' : 'light';
  }

  return 'light';
}
