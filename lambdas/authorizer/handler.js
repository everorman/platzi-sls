module.export.handler = (event, context) => {
  const date = new Date();
  const minutes = date.getMinutes();
  const hour = date.getHours();
  if (event.authorizationToken === `Bearer ${process.env.SECRET_KEY}-${hour}-${minutes}`) {
    return {
      principalId: 'anonymous',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn
          }
        ]
      }
    };
  }
  throw Error('Unauthorizer');
}; 