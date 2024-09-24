import { Prisma, PrismaClient } from '@prisma/client'
import PrismaRuntime from '@prisma/client/runtime/library'

import PrismaTypes = PrismaRuntime.Types

export type { PrismaTypes }
export { Prisma, PrismaClient } from '@prisma/client'
export * as PrismaRuntime from '@prisma/client/runtime/library'

export type ModelName = Prisma.ModelName
export type PrismaModelName = ModelName

export const getPrismaModelProp = <N extends PrismaModelName>(name: N) =>
  `${name.charAt(0).toLowerCase()}${name.slice(1)}` as PrismaModelProp<N>

export const getPrismaDelegate = <N extends PrismaModelName>(name: N, prisma: PrismaClient) =>
  prisma[getPrismaModelProp(name)] as PrismaModelDelegate<N> as any //* For generic model delegate

//* Use `PrismaModel` for any available Prisma model (e.g. as a method parameter or generic type parameter)
//* Use `PrismaModel<"YourModelName">` for specific Prisma model
export type PrismaModel<N extends ModelName> = PrismaTypes.Result.DefaultSelection<PrismaModelPayload<N>>
export type PrismaModelProp<N extends ModelName> = Uncapitalize<N>
export type PrismaModelType<N extends ModelName> = Prisma.TypeMap['model'][N]
export type PrismaModelPayload<N extends ModelName> = PrismaModelType<N>['payload']
export type PrismaModelDelegate<N extends ModelName> = PrismaClient[PrismaModelProp<N>]

export type PrismaModels = { [N in Prisma.ModelName]: PrismaModel<N> }
export type PrismaModelProps = { [N in Prisma.ModelName]: PrismaModelProp<N> }
export type PrismaModelTypes = { [N in Prisma.ModelName]: PrismaModelType<N> }
export type PrismaModelPayloads = { [N in Prisma.ModelName]: PrismaModelPayload<N> }
export type PrismaModelDelegates = { [N in Prisma.ModelName]: PrismaModelDelegate<N> }

export type FindManyArgs<N extends ModelName> = PrismaModelType<N>['operations']['findMany']['args']
export type FindUniqueArgs<N extends ModelName> = PrismaModelType<N>['operations']['findUnique']['args']
export type WhereInput<N extends ModelName> = NonNullable<FindManyArgs<N>['where']>
export type WhereAnd<N extends ModelName> = NonNullable<WhereInput<N>['AND']>
export type WhereOr<N extends ModelName> = NonNullable<WhereInput<N>['OR']>
export type WhereNot<N extends ModelName> = NonNullable<WhereInput<N>['NOT']>
export type WhereUniqueInput<N extends ModelName> = NonNullable<FindUniqueArgs<N>['where']>
export type OrderByInput<N extends ModelName> = NonNullable<FindManyArgs<N>['orderBy']>
