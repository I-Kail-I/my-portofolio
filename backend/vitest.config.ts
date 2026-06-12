import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Test file patterns
    include: ['test/**/*.test.ts', 'tests/**/*.test.ts', 'src/**/*.test.ts'],
    setupFiles: ['./test/setup.ts'],

    // Environment
    environment: 'node',

    // Enable global APIs like describe, it, expect (optional)
    globals: true,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.ts'],
    },

    // Timeout for tests (default 5000ms)
    testTimeout: 10000,

    // Ensure all hooks run even if test fails
    hookTimeout: 10000,

    },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/db': path.resolve(__dirname, './src/db'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/plugins': path.resolve(__dirname, './src/plugins'),
      '@/routes': path.resolve(__dirname, './src/routes'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
