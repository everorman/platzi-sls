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
  const id = event.pathParameters.id;

  const params = {
    TableName: "usersTable",
    Key: { pk: id },
  };

  return dynamodb
    .delete(params)
    .promise()
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ id: id }),
      };
    });

};
