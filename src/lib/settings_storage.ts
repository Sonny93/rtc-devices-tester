import store from 'store2';

const LS_SHOULD_ENABLE = 'should_enable_';

export const readStoredToggle = (name: string, fallback: boolean): boolean => {
	const storedValue: boolean | null = store(LS_SHOULD_ENABLE + name);
	return storedValue ?? fallback;
};

export const writeStoredToggle = (name: string, value: boolean): void => {
	store(LS_SHOULD_ENABLE + name, value);
};
