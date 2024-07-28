import createHttpError from 'http-errors'

export type HttpError = ReturnType<typeof createHttpError>
export type HttpSuccess<T = undefined> = { statusCode: 200; data?: T; message?: string }
