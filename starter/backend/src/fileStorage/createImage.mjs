import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3Client()
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
const bucketName = process.env.IMAGES_S3_BUCKET

export async function getUrl(todoId) {
    console.log(`todoID ${todoId}`)
    
    const bucketName = process.env.IMAGES_S3_BUCKET
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: todoId
      })
      const url = await getSignedUrl(s3Client, command, {
        expiresIn: urlExpiration
      })
      console.log(`URL ${url}`)

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(url)
      }
}