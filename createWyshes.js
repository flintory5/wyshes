'use strict';

const AWS = require('aws-sdk');
const WYSHES_TABLE = process.env.WYSHES_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const IS_OFFLINE = process.env.IS_OFFLINE;
const HEADERS = 'headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}';

module.exports.handler = async (event, context) => {
  console.log("Request received " + JSON.stringify(event.body));

  let dynamoDb;
  let fh = new AWS.Firehose();
  let response;
  let _parsed;

  try {
    _parsed = JSON.parse(event.body);
  } catch (err) {
    console.error(`Could not parse requested JSON ${JSON.stringify(event.body)}: ${err.stack}`);
    response = {
      statusCode: 500,
      headers: HEADERS,
      error: `Could not parse requested JSON: ${err.stack}`
    };
    return response;
  }
  const { name, description, url, price } = _parsed;

  let params = {
    TableName: WYSHES_TABLE,
    Item: {
      "wyshId": Date.now().toString(),
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

  try {
    const resp = await dynamoDb.put(params).promise();
    console.log(resp);
    console.log(`Successfully created wysh: ${params.Item.name}`);
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(params.Item)
    }
  }
  catch (err) {
      console.log(`createWyshes ERROR=${err.stack}`);
      return {
        statusCode: 400,
        headers: HEADERS,
        error: `Could not create wysh: ${err.stack}`
      }
  }
};
