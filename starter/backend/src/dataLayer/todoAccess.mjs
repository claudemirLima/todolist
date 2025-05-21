import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

export class TodoAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todoTable = process.env.TODOS_TABLE,
    index =process.env.TODOS_CREATED_AT_INDEX
  ) {
    this.documentClient = documentClient
    this.todoTable = todoTable
    this.index = index
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
  }

  async getAllTodosByUser(userID) {
    console.log(`Getting all todos by id ${userID}`)
  
    const result = await this.dynamoDbClient.query({
      TableName: this.todoTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userID
      }
    })
    console.log(result)
    return result.Items
  }

  async createTodo(todo) {
  
    await this.dynamoDbClient.put({
      TableName: this.todoTable,
      Item: todo
    })

    return todo
  }

  async updateTodo(todo) {
    console.log(`Updating a todo with id ${todo.todoId}`)
    console.log("Todo ready to update:",todo)
    
    await this.dynamoDbClient.update({
      TableName: this.todoTable,
      Key: {
        userId: todo.userId,
        todoId: todo.todoId
      },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done, attachmentUrl= :attachmentUrl',
      ExpressionAttributeNames: {
        '#name': 'name'  // 'name' is a reserved keyword in DynamoDB
      },
      ExpressionAttributeValues: {
        ':name': todo.name,
        ':dueDate': todo.dueDate,
        ':done': todo.done,
        ':attachmentUrl': todo.attachmentUrl
      }
    })

    return todo
  }

  async findTodoById (todoID) {
    console.log("before find",todoID)
    const result = await this.dynamoDbClient.query({
      TableName: this.todoTable,
      IndexName: 'TodoIdIndex',
      KeyConditionExpression: 'todoId = :todoID',
      ExpressionAttributeValues: {
        ':todoID': todoID
      }
    })
    console.log("return of find",result)
    return result.Items[0]
  }

  async deleteTodo(todoId, userID) {
    console.log(`Deleting todo with id ${todoId} for user ${userID}`)
  
    await this.dynamoDbClient.delete({
      TableName: this.todoTable,
      Key: {
        userId: userID,
        todoId: todoId
      }
    })
  
    return { todoId, deleted: true }
  }
  
}