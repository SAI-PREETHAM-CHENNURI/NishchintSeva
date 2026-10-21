import { useColorScheme as useRNColorScheme } from 'react-native';
import { useThemePreference } from '@/context/theme-context';

export function useColorScheme(): 'light' | 'dark' {
  const preference = useThemePreference();
  if (preference?.colorScheme) {
    return preference.colorScheme;
  }
  const rnScheme = useRNColorScheme();
  return rnScheme === 'dark' ? 'dark' : 'light';
}
