## [RTC Devices Tester](https://sonny93.github.io/rtc-devices-tester/)

Small project that lets you test your communication devices such as webcam(s), microphone(s) and speaker(s).

It works 100% locally, with no server involved.

You can use it [here](https://sonny93.github.io/rtc-devices-tester/)

### Prerequisites

Tools are managed with [mise](https://mise.jdx.dev/) (Node and pnpm versions are pinned in `.mise.toml`), and tasks are run with [just](https://just.systems/).

```shell
mise install
pnpm install
```

### Commands

```shell
just dev      # start the dev server
just build    # production build
just prod     # production build, then preview it
just check    # lint, format check, typecheck and knip
just format   # fix lint issues and format the code
just release  # create a release
```

### Technologies used

- React 19
- TypeScript 6
- Vite 8
- [@minimalstuff/ui](https://github.com/minimalstuff/ui)
- UnoCSS
- oxlint / oxfmt
