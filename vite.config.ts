import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/rtc-devices-tester/',
	plugins: [react(), UnoCSS()],
});
