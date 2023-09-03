'use strict';
const aws = require('aws-sdk');
const crypto = require('crypto');

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
  const id = crypto.randomBytes(20).toString('hex');
  const userBody = JSON.parse(event.body);
  userBody.pk = id;
  var params = {
    TableName: 'usersTable',
    Item: userBody
  };
  console.log('Data: ', userBody);
  return dynamodb.put(params).promise().then(res => {
    console.log(res);
    return {
      "statusCode": 200,
      "body": JSON.stringify({ 'user': userBody })
    };
  });
};
