import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  const userID = getUserId(event)
  const logger = createLogger('CreateTodo')
  
  logger.info("User ID", userID)

  logger.info("New Todo",newTodo);


  const newItem = await createTodo(newTodo,userID)


  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({"item":newItem})
  }
  
}

