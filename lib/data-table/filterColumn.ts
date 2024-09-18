import { Prisma } from '@prisma/client'
import { PrismaModels } from 'prisma-models'

import { type DataTableConfig } from '@/constant'
import { WhereAnd, WhereNot, WhereOr } from '@/types/prisma'

type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>
type ColumnType = 'Int' | 'BigInt' | 'Float' | 'Decimal' | 'Boolean' | 'DateTime' | 'String'

type FilterColumn<T extends keyof Models> = {
  column: keyof Models[T]
  columnType: ColumnType
  value: string
  isSelectable?: boolean
}

type WhereValue<T extends keyof Models> = WhereAnd<T> | WhereOr<T> | WhereNot<T>

type Operators =
  | DataTableConfig['comparisonOperators'][number]['value']
  | DataTableConfig['selectableOperators'][number]['value']
  | undefined

export function filterColumn<T extends keyof Models>({ column, columnType, value, isSelectable }: FilterColumn<T>) {
  const [filterValue, filterOperator] = (value?.split('~').filter(Boolean) ?? []) as [string, Operators]

  if (!filterValue) return

  const columnValue = isSelectable
    ? convertFilterValue(columnType, filterValue.split('.').filter(Boolean) ?? [])
    : convertFilterValue(columnType, filterValue)

  //* For Basic Filtering
  //TODO: if no operator - means basic filtering, if filterValue is not array use "equals", if array return an array of "OR" input values for the column
  if (!filterOperator) {
    if (isSelectable && Array.isArray(columnValue)) return { AND: { OR: columnValue.map((v) => ({ [column]: v })) } } as WhereValue<T>
    return { [column]: { contains: columnValue, mode: 'insensitive' } } as WhereValue<T>
  }

  //* For Advance Filtering
  if (isSelectable && Array.isArray(columnValue)) {
    switch (filterOperator) {
      case 'equals':
        return { AND: { OR: columnValue.map((v) => ({ [column]: v })) } } as WhereValue<T>
      case 'notEquals':
        return { NOT: { AND: { OR: columnValue.map((v) => ({ [column]: v })) } } } as WhereValue<T>
      default:
        return { AND: { OR: columnValue.map((v) => ({ [column]: v })) } } as WhereValue<T>
    }
  }

  switch (filterOperator) {
    case 'equals':
      return { [column]: { equals: columnValue, mode: 'insensitive' } } as WhereValue<T>
    case 'notEquals':
      return { NOT: { [column]: { equals: columnValue, mode: 'insensitive' } } } as WhereValue<T>
    case 'contains':
      return { [column]: { contains: columnValue, mode: 'insensitive' } } as WhereValue<T>
    case 'notContains':
      return { NOT: { [column]: { contains: columnValue, mode: 'insensitive' } } } as WhereValue<T>
    case 'startsWith':
      return { [column]: { startsWith: columnValue, mode: 'insensitive' } } as WhereValue<T>
    case 'notStartsWith':
      return { NOT: { [column]: { startsWith: columnValue, mode: 'insensitive' } } } as WhereValue<T>
    case 'endsWith':
      return { [column]: { endsWith: columnValue, mode: 'insensitive' } } as WhereValue<T>
    case 'notEndsWith':
      return { NOT: { [column]: { endsWith: columnValue, mode: 'insensitive' } } } as WhereValue<T>
    default:
      return { [column]: { contains: columnValue, mode: 'insensitive' } } as WhereValue<T>
  }
}

//* Convert filter value to the correct type
function convertFilterValue(columnType: string, value: string | string[]) {
  switch (columnType) {
    case 'Int':
    case 'BigInt':
      if (Array.isArray(value)) return value.map(Number)
      return parseInt(value, 10)

    case 'Float':
    case 'Decimal':
      if (Array.isArray(value)) return value.map((v) => parseFloat(v))
      return parseFloat(value)

    case 'Boolean':
      if (Array.isArray(value)) return value.map((v) => v === 'true')
      return value === 'true'

    case 'DateTime':
      if (Array.isArray(value)) return value.map((v) => new Date(v))
      return new Date(value)

    case 'String':
    default:
      return value
  }
}
