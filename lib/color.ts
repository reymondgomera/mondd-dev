type GenerateUniqueColorOptions = {
  saturationCycleLength: number
  baseSaturation: number
  saturationStep: number
  lightnessCycleLength: number
  baseLightness: number
  lightnessStep: number
}

const defaultOptions = {
  saturationCycleLength: 3,
  baseSaturation: 70,
  saturationStep: 3,
  lightnessCycleLength: 2,
  baseLightness: 50,
  lightnessStep: 10
} satisfies GenerateUniqueColorOptions

/**
 * Generate a unique color based on the index and total.
 * The color will be generated using the HSL color model.
 * @param index The index of the color to generate.
 * @param total The total number of colors to generate.
 * @param options The options for generating the color.
 *
 *
 * - `saturationCycleLength`: The number of colors to generate for each saturation value.
 * - `baseSaturation`: The base saturation value to start from.
 * - `saturationStep`: The step size for each saturation value.
 * - `lightnessCycleLength`: The number of colors to generate for each lightness value.
 * - `baseLightness`: The base lightness value to start from.
 * - `lightnessStep`: The step size for each lightness value.
 *
 * e.g:
 * - 3 colors for 70%, 80%, and 90%. which has baseSaturation of 70% and saturationStep of 10.
 * - So it starts from 70%, then 70+10=80%, 70+20=90%, it was incremented by 10 for each color. and only for 3 cycles.
 *
 * @example
 * const color = generateUniqueColor(0, 10)
 *
 * @returns
 */

export function generateUniqueColor(index: number, total: number, options: GenerateUniqueColorOptions | undefined = defaultOptions) {
  const { saturationCycleLength, baseSaturation, saturationStep, lightnessCycleLength, baseLightness, lightnessStep } = options

  const hue = (index / total) * 360
  const saturation = baseSaturation + (index % saturationCycleLength) * saturationStep // 70%, 80%, or 90%
  const lightness = baseLightness + (index % lightnessCycleLength) * lightnessStep // 50% or 60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
