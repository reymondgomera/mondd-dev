import axios from 'axios'
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { StoreApi, UseBoundStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { v4 as uuidv4 } from 'uuid'
import { ZodEffects, ZodObject, ZodRawShape, ZodType, ZodTypeAny } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getInitials = (str: string, limit: number = 2) => {
  if (!str) return ''

  return str.split(/\s/).reduce((response, word, index) => {
    if (index < limit) response += word.slice(0, 1)
    return response
  }, '')
}

export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
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

export function getFormDefaultValues<T extends ZodRawShape>(schema: ZodObject<T> | ZodEffects<ZodObject<T>>): DefaultValues<T> {
  let shape: ZodRawShape

  if (schema instanceof ZodEffects) shape = schema._def.schema.shape
  else shape = schema.shape

  return Object.fromEntries(
    Object.entries(shape).map(([key, fieldSchema]) => {
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

        case 'ZodArray':
          value = [] as const
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

export function isFieldRequired<T extends ZodTypeAny>(name: string, schema: T) {
  function isRequired(field: ZodTypeAny): boolean {
    if (!field) throw new Error(`Please set schema for ${name} field.`)

    if (field._def.typeName === 'ZodBoolean') return false
    if (field.isNullable()) return false

    return field.isOptional() ? false : true
  }

  function getField(schema: ZodTypeAny, path: string[]): ZodTypeAny | null {
    if (path.length === 0) return schema

    let shape: ZodRawShape

    if (schema instanceof ZodEffects) shape = schema._def.schema.shape
    else shape = schema._def.shape()

    const field = shape[path[0]]

    if (!field) return null

    if (field._def.typeName === 'ZodEffects') return getField(field._def.schema, path.slice(1))
    else if (field instanceof ZodObject) return getField(field, path.slice(1))
    else if (path.length === 1) return field
    else return null
  }

  const path = name.split('.')
  const field = getField(schema, path)

  if (!field) throw new Error(`Field ${name} does not exist in the schema.`)

  return isRequired(field)
}

export async function getFileFromBlobUrl(url: string) {
  const res = await axios.get(url, { responseType: 'blob' })
  const blob = res.data as Blob

  return new File([blob], uuidv4(), { type: blob.type })
}
