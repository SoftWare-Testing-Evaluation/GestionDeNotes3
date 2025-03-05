/// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // ou 'jsdom' selon tes besoins
    coverage: {
        provider: 'istanbul', // ou 'c8' si tu préfères
        reporter: ['text', 'html'], // Configure les formats de rapport
        include: ['src/**/*.js'], // Ajuste le chemin selon ton projet
        exclude: ['**/*.test.js'], // Exclut les fichiers de test
      },
  },
});
