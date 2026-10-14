import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

vi.stubGlobal(
	'matchMedia',
	(query: string): MediaQueryList =>
		({
			matches: false,
			media: query,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		}) as unknown as MediaQueryList
);

afterEach(() => {
	cleanup();
	localStorage.clear();
});
