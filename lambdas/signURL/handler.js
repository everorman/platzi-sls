const AWS = require('aws-sdk');

const s3 = new AWS.S3({ signatureVersion: 'v4' });

module.exports.handler = async (event) => {
  const filename = event.queryStringParameters.filename;
  const signedURL = await s3.getSignedUrlPromise('putObject', {
    Key: `upload/${filename}`,
    Bucket: process.env.BUCKET_NAME,
    Expires: 300,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ signedURL })
  };
};