export type ExcludeFromArray<T extends any[], toExclude> = Exclude<T[number], toExclude>[]

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
