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
module.exports.handler = async (event, context) => {
  console.log('Event', event);
  const body = event.Records[0].body;
  const userId = JSON.parse(body).userId;

  console.log(`User id: ${userId}`);
  const params = {
    TableName: 'usersTable',
    Key: { pk: userId },
    UpdateExpression: "AND likes :inc",
    ExpressionAttributeValues: {
      'inc': 1
    },
    ReturnValues: 'ALL_NEW'

  };
  const result = await dynamodb.update(params).promise();
  console.log('Result', result);
};