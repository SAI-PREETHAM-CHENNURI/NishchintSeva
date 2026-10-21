import React from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';
import { useThemePreference } from '@/context/theme-context';
import { useTheme } from '@/hooks/use-theme';

export type ThemeToggleProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function ThemeToggle({ style, testID = 'theme-toggle' }: ThemeToggleProps) {
  const { colorScheme, isDark, toggleTheme } = useThemePreference();
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={[styles.container, style]}>
      <Pressable
        testID={testID}
        onPress={toggleTheme}
        accessibilityRole="switch"
        accessibilityLabel="Toggle Dark Mode"
        accessibilityState={{ checked: isDark }}
        accessibilityHint="Switches between light and dark themes"
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        <View style={styles.textContainer}>
          <View style={styles.labelRow}>
            <ThemedText style={styles.icon}>{isDark ? '🌙' : '☀️'}</ThemedText>
            <ThemedText type="smallBold">Dark Mode</ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {isDark ? 'Dark theme active' : 'Light theme active'}
          </ThemedText>
        </View>

        <View style={styles.switchWrapper}>
          <ThemedView type="backgroundSelected" style={styles.badge}>
            <ThemedText type="code" style={styles.badgeText}>
              {colorScheme.toUpperCase()}
            </ThemedText>
          </ThemedView>
          <Switch
            testID={`${testID}-switch`}
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.backgroundSelected, true: '#2563eb' }}
            thumbColor={isDark ? '#93c5fd' : '#ffffff'}
            accessibilityLabel="Dark mode switch"
          />
        </View>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderRadius: Spacing.four,
    padding: Spacing.three,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  pressed: {
    opacity: 0.8,
  },
  textContainer: {
    gap: Spacing.half,
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  icon: {
    fontSize: 16,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  badge: {
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.two,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
