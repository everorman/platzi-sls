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
    TableName: 'usersTable',
    Key: { pk: userId },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeValues: { ':name': body.name },
    ReturnValues: 'ALL_NEW'

  };
  return dynamodb.update(params).promise().then(res => {
    console.log(res);
    return {
      "statusCode": 200,
      "body": JSON.stringify({ 'user': res.Attributes })
    };
  });

};
