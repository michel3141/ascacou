import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';

import react from '@vitejs/plugin-react';

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~~': path.resolve(__dirname, './'),
      '~assets': path.resolve(__dirname, './assets'),
    },
  },
  plugins: [react(), basicSsl()],
});
