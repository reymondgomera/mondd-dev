import { createSafeActionClient } from 'next-safe-action'

function handleServerErrorLog(err: Error) {
  console.error(err)
}

function handleReturnedServerError(err: Error) {
  throw err
}

export const action = createSafeActionClient({ handleServerErrorLog, handleReturnedServerError })

// TODO: auth action
export const authAction = createSafeActionClient({ handleServerErrorLog, handleReturnedServerError })
