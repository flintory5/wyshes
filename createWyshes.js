'use strict';

const AWS = require('aws-sdk');
const WYSHES_TABLE = process.env.WYSHES_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const IS_OFFLINE = process.env.IS_OFFLINE;
const HEADERS = 'headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}';

module.exports.handler = async (event, context) => {
  console.log("Request received " + JSON.stringify(event));

  let dynamoDb;
  let fh = new AWS.Firehose();
  let response;
  let _parsed;

  try {
    _parsed = JSON.parse(JSON.stringify(event));
  } catch (err) {
    console.error(`Could not parse requested JSON ${JSON.stringify(event.body)}: ${err.stack}`);
    response = {
      statusCode: 500,
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      error: `Could not parse requested JSON: ${err.stack}`
    };
    callback(err, response);
  }
  const { name, description, url, price } = _parsed;

  let params = {
    TableName: WYSHES_TABLE,
    Item: {
      "name": name,
      "description": description,
      "url": url,
      "price": price
    }
  }

  if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
    console.log(dynamoDb);
  } else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  console.log("Item:\n", params.Item);

  dynamoDb.put(params, function(err, data) {
    if (err) {
      console.log(`createWyshes ERROR=${err.stack}`);
      response = {
        statusCode: 400,
        headers: HEADERS,
        error: `Could not create wysh: ${err.stack}`
      }
    } else {
      console.log(`Successfully created wysh: ${params.Item.name}`);
      response = {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(params.Item)
      }
    }
  });

  return response;
};
