module.exports.handler = (event, context, callback) => {
  const date = new Date();
  const minutes = date.getMinutes();
  const hour = date.getHours();
  console.log(event.authorizationToken, '+++++', `Bearer ${process.env.SECRET_KEY}-${hour}-${minutes}`);
  if (event.authorizationToken === `Bearer ${process.env.SECRET_KEY}-${hour}-${minutes}`) {
    console.log('Token OK', JSON.stringify(generateAllow('anonymous', event.methodArn)));
    callback(null, generateAllow('anonymous', event.methodArn));
  } else {
    callback("Unauthorized");
  }

};

// Help function to generate an IAM policy
var generatePolicy = function (principalId, effect, resource) {
  var authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

var generateAllow = function (principalId, resource) {
  return generatePolicy(principalId, 'Allow', resource);
};