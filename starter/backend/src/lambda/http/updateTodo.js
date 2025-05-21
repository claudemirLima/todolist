import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { findTodo,updateTodo } from '../../businessLogic/todos.mjs'
import { createLogger } from '../../utils/logger.mjs'

export async function handler(event) {
  const updateToDo = JSON.parse(event.body)
  const todoId = event.pathParameters.todoId
  const userID = getUserId(event)
  const logger = createLogger('Update Todo')

  logger.info(updateToDo);
  logger.info("Updating todoId:", todoId)

  const todoFind = await findTodo(todoId)
  logger.info("todo find:",todoFind)
  todoFind.done = updateToDo.done
  const newItem = await updateTodo(todoFind,todoId,userID)


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
  
}

