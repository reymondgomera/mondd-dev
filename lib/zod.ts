import { ZodEffects, ZodObject, ZodRawShape, ZodType, ZodTypeAny } from 'zod'

type DefaultValues<T> = {
  [K in keyof T]: T[K] extends ZodType<any, any, infer U> ? (U extends null ? null : U) : never
}

export function getFormDefaultValues<T extends ZodRawShape>(schema: ZodObject<T> | ZodEffects<ZodObject<T>>): DefaultValues<T> {
  function getValue(typeName: string, schema: ZodTypeAny) {
    switch (typeName) {
      case 'ZodNullable':
        return null

      case 'ZodString':
        return ''

      case 'ZodBoolean':
        return false

      case 'ZodNumber':
        return 0

      case 'ZodDate':
        return new Date() as Date

      case 'ZodArray':
        return [] as const

      case 'ZodObject':
        return getFormDefaultValues(schema as ZodObject<T>)

      case 'ZodEffects':
        return getValue(schema._def.schema._def.typeName, schema)

      default:
        return undefined
    }
  }

  let shape: ZodRawShape

  if (schema instanceof ZodEffects) shape = schema._def.schema.shape
  else shape = schema.shape

  return Object.fromEntries(
    Object.entries(shape).map(([key, fieldSchema]) => {
      const typeName = fieldSchema._def.typeName as string
      const value = getValue(typeName, fieldSchema)
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

  function getShape(schema: ZodTypeAny): ZodRawShape | null {
    if (schema instanceof ZodEffects) return getShape(schema._def.schema)
    return schema._def.shape()
  }

  function getField(schema: ZodTypeAny, path: string[]): ZodTypeAny | null {
    if (path.length === 0) return schema

    const shape = getShape(schema)

    if (!shape) return null

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
