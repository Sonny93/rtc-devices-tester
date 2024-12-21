import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import deadFile from 'vite-plugin-deadfile';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    eslint(),
    tsconfigPaths(),
    deadFile({
      root: 'src',
    }),
  ],
});
