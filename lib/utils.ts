import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodObject, ZodRawShape, ZodType } from 'zod'
import { StoreApi, UseBoundStore } from 'zustand'
import { shallow } from 'zustand/shallow'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type GenericState = Record<string, any>

export const createStoreWithSelectors = <T extends GenericState>(
  store: UseBoundStore<StoreApi<T>>
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
  const useStore: <K extends keyof T>(keys: K[]) => Pick<T, K> = <K extends keyof T>(keys: K[]) => {
    return store((state) => {
      const x: Partial<T> = {}

      if (Array.isArray(keys)) {
        for (const key of keys) {
          x[key] = state[key]
        }
      }

      return x as Pick<T, K>
    }, shallow)
  }

  return useStore
}

type DefaultValues<T> = {
  [K in keyof T]: T[K] extends ZodType<any, any, infer U> ? (U extends null ? null : U) : never
}

export function getFormDefaultValues<T extends ZodRawShape>(schema: ZodObject<T>): DefaultValues<T> {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, fieldSchema]) => {
      let value

      const typeName = fieldSchema._def.typeName

      switch (typeName) {
        case 'ZodNullable':
          value = null
          break

        case 'ZodString':
          value = ''
          break

        case 'ZodBoolean':
          value = false
          break

        case 'ZodNumber':
          value = 0
          break

        case 'ZodDate':
          value = new Date()
          break

        case 'ZodObject':
          value = getFormDefaultValues(fieldSchema as ZodObject<T>)
          break

        default:
          value = undefined
          break
      }

      return [key, value]
    })
  ) as DefaultValues<T>
}
