dev:
	@pnpm run dev

build:
	@rm -rf dist
	@pnpm run build

prod: build
	@pnpm run serve

release:
	@npx release-it
