import TWColors from 'tailwindcss/colors'

type SpecialColors = 'inherit' | 'current' | 'transparent' | 'black' | 'white'

type TailwindColorCategory = keyof Omit<typeof TWColors, SpecialColors>

export type TailwindColorVariables = `--${TailwindColorCategory}-${keyof (typeof TWColors)[TailwindColorCategory]}` | `--${SpecialColors}`
