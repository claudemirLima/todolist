import * as uuid from 'uuid'
import { TodoAccess } from '../dataLayer/todoAccess.mjs'

const todoAccess = new TodoAccess()

export async function getAllTodosUser(userID) {
  return todoAccess.getAllTodosByUser(userID)
}

export async function findTodo(todoID) {
  console.log("findTodo find:",todoID)
  return todoAccess.findTodoById(todoID)
}

export async function createTodo(createRequest, userID) {
  const itemId = uuid.v4()

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userID,
    name: createRequest.name,
    dueDate: createRequest.dueDate,
    createdAt: new Date().toISOString()
  })
}

export async function updateTodo(updateRequest, todoID,userID) {
  
  return await todoAccess.updateTodo({
    todoId: todoID,
    userId: userID,
    name: updateRequest.name,
    dueDate: updateRequest.dueDate ,
    attachmentUrl: updateRequest.attachmentUrl !== undefined ? updateRequest.attachmentUrl : null,
    done:updateRequest.done !== undefined ? updateRequest.done : false
  })
}

export async function delTodo(todoID,userID) {
   return  todoAccess.deleteTodo(todoID,userID)
}