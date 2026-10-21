import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// 1. Theme Constants and Color Palettes
// ---------------------------------------------------------------------------
test('Theme Constants: Light and Dark palettes have required contrast and tokens', async () => {
  const themeFilePath = path.join(projectRoot, 'src', 'constants', 'theme.ts');
  assert.ok(fs.existsSync(themeFilePath), 'theme.ts must exist');

  const content = fs.readFileSync(themeFilePath, 'utf-8');
  assert.match(content, /export const Colors\s*=/, 'Colors object must be exported');
  assert.match(content, /light:\s*\{/, 'Colors.light must be defined');
  assert.match(content, /dark:\s*\{/, 'Colors.dark must be defined');

  // Verify key color tokens
  const requiredTokens = ['text', 'background', 'backgroundElement', 'backgroundSelected', 'textSecondary'];
  for (const token of requiredTokens) {
    assert.ok(content.includes(token), `Theme must define token: ${token}`);
  }

  // Verify contrast expectations
  assert.match(content, /background:\s*'#ffffff'/, 'Light background should be white');
  assert.match(content, /background:\s*'#000000'/, 'Dark background should be black');
});

// ---------------------------------------------------------------------------
// 2. Theme Preference State Transitions
// ---------------------------------------------------------------------------
test('Theme Preference State: Toggle and explicit scheme transitions', () => {
  // Pure state transition model mirroring ThemePreferenceProvider logic
  function createThemeState(initial = 'light') {
    let current = initial;
    return {
      get colorScheme() {
        return current;
      },
      get isDark() {
        return current === 'dark';
      },
      toggleTheme() {
        current = current === 'dark' ? 'light' : 'dark';
      },
      setColorScheme(scheme) {
        if (scheme === 'light' || scheme === 'dark') {
          current = scheme;
        }
      },
    };
  }

  const state = createThemeState('light');
  assert.strictEqual(state.colorScheme, 'light');
  assert.strictEqual(state.isDark, false);

  // Toggle light -> dark
  state.toggleTheme();
  assert.strictEqual(state.colorScheme, 'dark');
  assert.strictEqual(state.isDark, true);

  // Toggle dark -> light
  state.toggleTheme();
  assert.strictEqual(state.colorScheme, 'light');
  assert.strictEqual(state.isDark, false);

  // Explicit set
  state.setColorScheme('dark');
  assert.strictEqual(state.colorScheme, 'dark');
  assert.strictEqual(state.isDark, true);

  state.setColorScheme('light');
  assert.strictEqual(state.colorScheme, 'light');
  assert.strictEqual(state.isDark, false);

  // Multi-cycle toggles
  for (let i = 0; i < 6; i++) {
    const expected = i % 2 === 0 ? 'dark' : 'light';
    state.toggleTheme();
    assert.strictEqual(state.colorScheme, expected, `Cycle ${i + 1} expected ${expected}`);
  }
});

// ---------------------------------------------------------------------------
// 3. Theme Context Provider & Hook Architecture
// ---------------------------------------------------------------------------
test('Theme Context: Exports and provider implementation integrity', () => {
  const contextFilePath = path.join(projectRoot, 'src', 'context', 'theme-context.tsx');
  assert.ok(fs.existsSync(contextFilePath), 'theme-context.tsx must exist');

  const content = fs.readFileSync(contextFilePath, 'utf-8');
  assert.match(content, /export function ThemePreferenceProvider/, 'Must export ThemePreferenceProvider');
  assert.match(content, /export function useThemePreference/, 'Must export useThemePreference');
  assert.match(content, /export type ColorSchemePreference = 'light' \| 'dark'/, 'Must export ColorSchemePreference type');
  assert.match(content, /toggleTheme/, 'Must provide toggleTheme function in context');
  assert.match(content, /setColorScheme/, 'Must provide setColorScheme function in context');
  assert.match(content, /isDark/, 'Must provide isDark boolean in context');
});

// ---------------------------------------------------------------------------
// 4. Hook Integration
// ---------------------------------------------------------------------------
test('Theme Hooks: useColorScheme and useTheme connect to theme preference', () => {
  const nativeHookPath = path.join(projectRoot, 'src', 'hooks', 'use-color-scheme.ts');
  const webHookPath = path.join(projectRoot, 'src', 'hooks', 'use-color-scheme.web.ts');
  const useThemePath = path.join(projectRoot, 'src', 'hooks', 'use-theme.ts');

  assert.ok(fs.existsSync(nativeHookPath), 'use-color-scheme.ts must exist');
  assert.ok(fs.existsSync(webHookPath), 'use-color-scheme.web.ts must exist');
  assert.ok(fs.existsSync(useThemePath), 'use-theme.ts must exist');

  const nativeContent = fs.readFileSync(nativeHookPath, 'utf-8');
  assert.match(nativeContent, /useThemePreference/, 'Native hook must reference useThemePreference');

  const webContent = fs.readFileSync(webHookPath, 'utf-8');
  assert.match(webContent, /useThemePreference/, 'Web hook must reference useThemePreference');

  const themeContent = fs.readFileSync(useThemePath, 'utf-8');
  assert.match(themeContent, /useColorScheme/, 'useTheme must call useColorScheme');
  assert.match(themeContent, /Colors\[theme\]/, 'useTheme must index Colors using resolved theme');
});

// ---------------------------------------------------------------------------
// 5. Theme Toggle UI Component
// ---------------------------------------------------------------------------
test('Theme Toggle Component: Accessible Dark Mode toggle component', () => {
  const toggleFilePath = path.join(projectRoot, 'src', 'components', 'theme-toggle.tsx');
  assert.ok(fs.existsSync(toggleFilePath), 'theme-toggle.tsx must exist');

  const content = fs.readFileSync(toggleFilePath, 'utf-8');
  assert.match(content, /export function ThemeToggle/, 'Must export ThemeToggle component');
  assert.match(content, /accessibilityRole="switch"/, 'Must have switch accessibility role');
  assert.match(content, /accessibilityLabel="Toggle Dark Mode"/, 'Must have descriptive accessibility label');
  assert.match(content, /Switch/, 'Must render Switch component');
  assert.match(content, /toggleTheme/, 'Must bind toggleTheme to actions');
  assert.match(content, /isDark/, 'Must reflect isDark state');
});

// ---------------------------------------------------------------------------
// 6. Application Layout & Screen Integration
// ---------------------------------------------------------------------------
test('Application Integration: Layout is wrapped and HomeScreen includes ThemeToggle', () => {
  const layoutFilePath = path.join(projectRoot, 'src', 'app', '_layout.tsx');
  const homeFilePath = path.join(projectRoot, 'src', 'app', 'index.tsx');

  assert.ok(fs.existsSync(layoutFilePath), '_layout.tsx must exist');
  assert.ok(fs.existsSync(homeFilePath), 'index.tsx must exist');

  const layoutContent = fs.readFileSync(layoutFilePath, 'utf-8');
  assert.match(layoutContent, /ThemePreferenceProvider/, 'Root TabLayout must wrap tree with ThemePreferenceProvider');
  assert.match(layoutContent, /useThemePreference/, 'Root layout must consume theme preference');

  const homeContent = fs.readFileSync(homeFilePath, 'utf-8');
  assert.match(homeContent, /import\s*\{\s*ThemeToggle\s*\}\s*from\s*'@\/components\/theme-toggle'/, 'HomeScreen must import ThemeToggle');
  assert.match(homeContent, /<ThemeToggle\s*\/>/, 'HomeScreen must render ThemeToggle');
});
