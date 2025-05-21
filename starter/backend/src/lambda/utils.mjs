import { parseUserId } from '../auth/utils.mjs'

export function getUserId(event) {
  const authorization = event.headers.Authorization
  return parseUserId(authorization)
}
