'use strict';

const AWS = require('aws-sdk');

class wyshDatabase {

    constructor(stage, offline) {
        this.offline = offline;
        this.db = this.getDatabase();
        this.tableName = 'gyft-wyshes-table-' + stage;
    }

    getDatabase(){
        let dynamoDb;
        if (this.offline === true) {
            dynamoDb = new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
            })
        } else {
            dynamoDb = new AWS.DynamoDB.DocumentClient();
        }
        return dynamoDb;
    }
}

module.exports = wyshDatabase;