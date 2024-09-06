import { Prisma } from '@prisma/client'
import { CommonError, QueryError } from 'prisma-error-enum'

const commonErrorCodes = Object.values(CommonError)
const queryErrorCodes = Object.values(QueryError)

const serverActionErrorCodes = [
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429,
  431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511
] as const

export type CommonErrorCode = (typeof commonErrorCodes)[number]
export type QueryErrorCode = (typeof queryErrorCodes)[number]
export type PrismaErrorCodes = CommonErrorCode | QueryErrorCode

type PrismaError = {
  code?: PrismaErrorCodes
  meta?: Record<string, unknown>
  message: string
  clientVersion: string
}

export type ServerActionErrorCodes = (typeof serverActionErrorCodes)[number] | PrismaErrorCodes

export type ServerActionError<T = undefined> = {
  error: true
  code: ServerActionErrorCodes
  message: string
  data?: T
  cause?: any
  action?: string
}
export type ServerActionSuccess<T = undefined> = { error: false; code: 200; message: string; data?: T }

export function getPrismaError(err: unknown): PrismaError | undefined {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const message = getErrorMessage(err.code, err.message)
    return { ...err, code: err.code as PrismaErrorCodes, message }
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    const message = getErrorMessage(err.errorCode, err.message)
    return { ...err, code: err.errorCode as PrismaErrorCodes, message }
  }

  if (
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    return err
  }
}

function getErrorMessage(code?: string, message?: string) {
  switch (code) {
    //* common errors
    case CommonError.AuthenticationFailed:
      return 'Authentication failed.'
    case CommonError.CouldNotConnectToDatabase:
      return 'Could not connect to database.'
    case CommonError.ConnectionTimedOut:
      return 'Connection timed out.'
    case CommonError.DatabaseFileNotFound:
      return 'Database file not found.'
    case CommonError.OperationsTimedOut:
      return 'Operations timed out.'
    case CommonError.DatabaseAlreadyExists:
      return 'Database already exists.'
    case CommonError.AccessDeniedForUser:
      return 'Access denied for user.'
    case CommonError.TLSConnectionError:
      return 'TLS connection error.'
    case CommonError.Error:
      return message ?? 'Validation or parsing error'
    case CommonError.InvalidDatabaseString:
      return 'Invalid database string.'
    case CommonError.KindForModelDoesNotExist:
      return 'Kind for model does not exist.'
    case CommonError.UnsupportedFeaturesAtPrismaSchema:
      return 'Unsupported features at prisma schema.'
    case CommonError.IncorrectNumberOfParameters:
      return 'Incorrect number of parameters.'
    case CommonError.ServerClosedConnection:
      return 'Server closed connection.'

    //* query errors
    case QueryError.ValueTooLongForColumnType:
      return 'Value too long for column type.'
    case QueryError.RecordDoesNotExist:
      return 'Record does not exist.'
    case QueryError.UniqueConstraintViolation:
      return 'Unique constraint violation.'
    case QueryError.ForeignConstraintViolation:
      return 'Foreign constraint violation.'
    case QueryError.ConstraintViolation:
      return 'Constraint violation.'
    case QueryError.InvalidValueForFieldType:
      return 'Invalid value for field type.'
    case QueryError.InvalidValue:
      return 'Invalid value.'
    case QueryError.ValidationError:
      return 'Validation error.'
    case QueryError.QueryParsingError:
      return 'Query parsing error.'
    case QueryError.QueryValidationError:
      return 'Query validation error.'
    case QueryError.RawQueryError:
      return 'Raw query error.'
    case QueryError.NullConstraintViolation:
      return 'Null constraint violation.'
    case QueryError.MissingRequiredValue:
      return 'Missing required value.'
    case QueryError.MissingRequiredArgument:
      return 'Missing required argument.'
    case QueryError.RequiredRelationViolation:
      return 'Required relation violation.'
    case QueryError.RelatedRecordNotFound:
      return 'Related record not found.'
    case QueryError.InterpretationError:
      return 'Interpretation error.'
    case QueryError.RecordsForParentAndChildNotConnected:
      return 'Records for parent and child not connected.'
    case QueryError.RequiredConnnectedRecordsNotFound:
      return 'Required connected records not found.'
    case QueryError.InputError:
      return 'Input error.'
    case QueryError.ValueOutOfRange:
      return 'Value out of range.'
    case QueryError.TableDoesNotExist:
      return 'Table does not exist.'
    case QueryError.ColumnDoesNotExist:
      return 'Column does not exist.'
    case QueryError.InconsistentColumnData:
      return 'Inconsistent column data.'
    case QueryError.TimedOutFetchingConnectionFromThePool:
      return 'Timed out fetching connection from the pool.'
    case QueryError.RecordsNotFound:
      return 'Records not found.'
    case QueryError.UnsupportedProviderFeature:
      return 'Unsupported provider feature.'
    case QueryError.MultipleErrors:
      return 'Multiple errors.'

    default:
      return 'Unknown prisma error'
  }
}

export function getServerActionError(err: unknown, action?: string) {
  let message

  if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') message = err.message

  const serverActionError = {
    error: true,
    code: 500,
    cause: JSON.stringify(err),
    message: message ?? 'Internal Server Error',
    action: action ?? 'SERVER_ACTION'
  } as ServerActionError

  const prismaError = getPrismaError(err)

  if (prismaError) {
    if (prismaError.code) serverActionError.code = prismaError.code
    serverActionError.message = prismaError.message
    return serverActionError
  }

  return serverActionError
}

export function returnServerActionError<T = undefined>(errObj: Omit<ServerActionError<T>, 'error'>) {
  return { error: true, ...errObj } as ServerActionError<T>
}

export function returnServerActionSuccess<T = undefined>({ data, message }: { data?: T; message?: string }) {
  return { data, message: message ?? 'Action executed successfully.', error: false, code: 200 } as ServerActionSuccess<T>
}
