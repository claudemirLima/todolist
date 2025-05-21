import {PutObjectCommand,GetObjectCommand,S3Client} from '@aws-sdk/client-s3'
import { findTodo,updateTodo } from '../../businessLogic/todos.mjs'

  const s3Client = new S3Client()
  const imagesBucket = process.env.IMAGES_S3_BUCKET

  export async function handler(event) {
    console.log('Processing S3 event ', JSON.stringify(event))
    for (const record of event.Records) {
      
      const todo = await findTodo(record.s3.object.key)
      console.log("todo find:",todo)
      todo.attachmentUrl = 'https://'+imagesBucket+'.s3.amazonaws.com/'+record.s3.object.key

      const updateItem = await updateTodo(todo,record.s3.object.key,todo.userId)
      console.log(updateItem)
    }
  }