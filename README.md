# vite-define-failing-build

The define plugin of vite is replacing code inside node_modules, which can lead to failing builds.

Tracked in https://github.com/vitejs/vite/issues/4271
Fixed in https://github.com/vitejs/vite/pull/5515

## Reproduce the issue

1. `yarn`
1. `yarn build` -> fails
1. uncomment line 9 in `vite.config.ts`
1. `yarn build` -> doesn't fail

## Explanation

The define plugin allows the use of a global var called `__DEV__`. Take a look at the `src/App.tsx` file (line 11) to see it in action. The define plugin statically replaces this part of the code with a boolean during the build process, e.g. `if (__DEV__)` becomes `if (false)`. However, the `warning` dependency is also defining a var named `__DEV__`. Vite replaces this part as well. The final code in warning.js looks something like this: `var false = process.env.NODE_ENV !== "production"`. That's not valid js, the build fails.

