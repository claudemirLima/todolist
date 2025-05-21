import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUrl } from '../../fileStorage/createImage.mjs'
import { updateTodo } from '../../businessLogic/todos.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'


export async function handler(event) {
  const logger = createLogger('Generting URL')
  const todoId = event.pathParameters.todoId
  const userID = getUserId(event)
  const url    = await getUrl(todoId);
  

  logger.info("URL return", url)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: url
    })
  }
}

