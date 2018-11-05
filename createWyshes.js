'use strict';

const AWS = require('aws-sdk');
const Wyshes = require('../wyshes/Wyshes');
const WYSHES_TABLE = process.env.WYSHES_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;
const IS_OFFLINE = process.env.IS_OFFLINE;
const HEADERS = 'headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}';

module.exports.handler = async (event, context) => {
  console.log("Request received " + JSON.stringify(event.body));

  let fh = new AWS.Firehose();
  let _parsed;

  try {
    _parsed = JSON.parse(event.body);
  } catch (err) {
    console.error(`Could not parse requested JSON ${JSON.stringify(event.body)}: ${err.stack}`);
    return {
      statusCode: 500,
      headers: HEADERS,
      error: `Could not parse requested JSON: ${err.stack}`
    };
  }
  const { name, description, url, price } = _parsed;

  let wysh = new Wyshes(null, 'dev', true);

  try {
    return wysh.saveWysh(name, description, url, price);
  } catch (err) {
    console.error(`Could not create Wysh ${name}: ${err.stack}`);
    return {
      statusCode: 500,
      headers: HEADERS,
      error: `Could not create Wysh: ${err.stack}`
    };   
  }
};
