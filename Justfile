dev:
	@pnpm run dev

build:
	@rm -rf dist
	@pnpm run build

prod: build
	@pnpm run serve

release:
	@pnpm release

format:
	@pnpm format

check:
	@pnpm check

test:
	@pnpm test
