import type { Config } from 'release-it';

export default {
	hooks: {
		'before:init': ['pnpm run check'],
	},
	git: {
		commitMessage: 'chore: release v${version}',
		commit: true,
		tag: true,
		push: true,
	},
	github: {
		release: true,
		releaseName: 'Release ${version}',
		autoGenerate: true,
	},
	npm: {
		publish: false,
	},
} satisfies Config;
