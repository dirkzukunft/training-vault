import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

const { EXPRESS_PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${EXPRESS_PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/app',
  },
});
