import { describe, expect, it } from 'vitest';

import { readStoredToggle, writeStoredToggle } from '#/lib/settings_storage';

describe('readStoredToggle', () => {
	it('should return the true fallback when nothing is stored', () => {
		expect(readStoredToggle('video', true)).toBe(true);
	});

	it('should return the false fallback when nothing is stored', () => {
		expect(readStoredToggle('speaker', false)).toBe(false);
	});

	it('should return the stored false when the fallback is true', () => {
		writeStoredToggle('video', false);

		expect(readStoredToggle('video', true)).toBe(false);
	});

	it('should return the stored true when the fallback is false', () => {
		writeStoredToggle('speaker', true);

		expect(readStoredToggle('speaker', false)).toBe(true);
	});
});
