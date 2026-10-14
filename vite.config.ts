import UnoCSS from 'unocss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	base: '/rtc-devices-tester/',
	plugins: [react(), UnoCSS()],
	test: {
		environment: 'jsdom',
		execArgv: ['--no-experimental-webstorage'],
		setupFiles: ['./src/test_setup.ts'],
	},
});
