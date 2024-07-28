import { Prisma } from '@prisma/client'
import createHttpError from 'http-errors'
import createError from 'http-errors'
import { CommonError, MigrationError, QueryError } from 'prisma-error-enum'

type PrismaClientErrorContructor = {
  errorCode?: string
  code?: string
  meta?: Record<string, unknown>
  message: string
  clientVersion: string
  action: string
}

export class PrismaClientError extends Error {
  name: string = 'PrismaClientError'
  code?: string
  meta?: Record<string, unknown>
  message: string
  clientVersion: string
  action: string

  constructor({ code, errorCode, meta, message, clientVersion, action }: PrismaClientErrorContructor) {
    super()
    this.code = code || errorCode
    this.meta = meta
    this.message = message
    this.clientVersion = clientVersion
    this.action = action
  }
}

export function resolveAppError(error: unknown, action: string) {
  const prismaError = resolvePrismaClientError(error, action)
  const httpError = resolveHttpError(error, action)

  if (prismaError) return prismaError

  return httpError
}

export function resolveHttpError(err: unknown, action: string) {
  if (err instanceof createHttpError.HttpError && err.statusCode < 500) return err

  if (err instanceof createHttpError.HttpError && err.statusCode === 500) return createError(500, err.message, { action })

  return createError(500, 'Internal Server Error', { action, cause: err })
}

export function resolvePrismaClientError(err: unknown, action: string) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const message = getErrorMessage(err.code, err.message)
    return new PrismaClientError({ ...err, code: err.code, message, action })
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    const message = getErrorMessage(err.errorCode, err.message)
    return new PrismaClientError({ ...err, code: err.errorCode, message, action })
  } else if (
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    return new PrismaClientError({ ...err, message: err.message, action })
  }
}

function getErrorMessage(code?: string, message?: string) {
  switch (code) {
    // common errors
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

    // query errors
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

    // migration errors
    case MigrationError.FailedToCreateDatabase:
      return 'Failed to create database.'
    case MigrationError.PossibleDestructiveOrDataLossChanges:
      return 'Possible destructive or data loss changes.'
    case MigrationError.MigrationRolledBack:
      return 'Migration rolled back.'
    case MigrationError.InvalidMigrationFormat:
      return 'Invalid migration format.'
    case MigrationError.SystemDatabaseNotSupported:
      return 'System database not supported.'
    case MigrationError.DatabaseNotEmpty:
      return 'Database not empty.'
    case MigrationError.CouldNotApplyCleanlyToTemporaryDatabase:
      return 'Could not apply cleanly to temporary database.'
    case MigrationError.PreviewFeaturesNotAllowedInMigrationEngine:
      return 'Preview features not allowed in migration engine.'
    case MigrationError.MigrationAlreadyApplied:
      return 'Migration already applied.'
    case MigrationError.FailedMigrationsFound:
      return 'Failed migrations found.'
    case MigrationError.MigrationNameTooLong:
      return 'Migration name too long.'
    case MigrationError.CannotRollBackANeverAppliedMigration:
      return 'Cannot roll back a never applied migration.'
    case MigrationError.CannotRollBackANotFailedMigration:
      return 'Cannot roll back a not failed migration.'
    case MigrationError.DatasourceProviderArraysNotSupported:
      return 'Datasource provider arrays not supported.'
    case MigrationError.DatasourceProviderDontMatchMigrationLock:
      return 'Datasource provider dont match migration lock.'
    case MigrationError.MissingMigrationFile:
      return 'Missing migration file.'
    case MigrationError.CouldNotCleanupDatabase:
      return 'Could not cleanup database.'
    case MigrationError.MigrationNotFound:
      return 'Migration not found.'
    case MigrationError.FailedToApplyMigration:
      return 'Failed to apply migration.'
    case MigrationError.DatasourceProvidersDontMatch:
      return 'Datasource providers dont match.'
    case MigrationError.ShadowDatabasesAutomaticCreationIsDisabled:
      return 'Shadow databases automatic creation is disabled.'

    default:
      return 'Unknown prisma error'
  }
}
