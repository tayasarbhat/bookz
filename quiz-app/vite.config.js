import { defineConfig } from 'vite';

export default defineConfig({
  base: '/bookz/quiz-app/', // Add base URL for quiz app
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});