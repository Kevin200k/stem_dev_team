import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/stem_dev_team/', // 👈 Must match your GitHub repo name
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
});
