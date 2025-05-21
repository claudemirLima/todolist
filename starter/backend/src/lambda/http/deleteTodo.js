
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { delTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

export async function handler(event) {
  const logger = createLogger('DeleteTodo')
  const todoId = event.pathParameters.todoId
  logger.info("Delte todoId:", todoId)
  const userID = getUserId(event)
 logger.info("Get the userId:", userID)
  const item = await delTodo(todoId,userID)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
  
}
