import { describe, expect, it } from 'vitest';

import { capitalize } from '#/lib/string';

describe('capitalize', () => {
	it('should uppercase the first letter when the string is lowercase', () => {
		expect(capitalize('microphone')).toBe('Microphone');
	});

	it('should keep the rest of the string untouched when capitalizing', () => {
		expect(capitalize('fLIP')).toBe('FLIP');
	});

	it('should return an empty string when called without argument', () => {
		expect(capitalize()).toBe('');
	});
});
