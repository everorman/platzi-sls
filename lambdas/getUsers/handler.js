'use strict';
const aws = require('aws-sdk');
let dynamoDBClientParams = {};

if (process.env.IS_OFFLINE) {
  dynamoDBClientParams = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  };
}
const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

module.exports.handler = async (event) => {
  let userId = event.pathParameters.id;
  var params = {
    ExpressionAttributeValues: { ':pk': userId },
    KeyConditionExpression: 'pk = :pk',
    TableName: 'usersTable'
  };
  return dynamodb.query(params).promise().then(res => {
    console.log(res);
    return {
      "statusCode": 200,
      "body": JSON.stringify({ 'user': res.Items[0] })
    };
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
