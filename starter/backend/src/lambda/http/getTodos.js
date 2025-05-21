import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getAllTodosUser } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('Get all by userID')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    
    const userID = getUserId(event)
    const todos = await getAllTodosUser(userID)
    logger.info('Processing event by UserID: ', userID)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  })
