var path = require('path');
const wyshDatabase = require( path.resolve( __dirname, 'wyshDatabase'));
const HEADERS = '"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"';

class Wyshes {

    constructor(db) {
        this.wyshDb = db;
    }

    saveWysh(body, callback) {
        let resp;
        let params = {
            TableName: this.wyshDb.tableName,
            Item: {
              "wyshId": Date.now().toString(),
              "name": body.name,
              "description": body.description,
              "url": body.url,
              "price": body.price
            }
        }

        this.wyshDb.db.put(params, (err, wysh) => {
            if (err) {
                console.log(`createWyshes ERROR=${err.stack}`);
                resp = {
                    statusCode: 400,
                    headers: HEADERS,
                   error: `Could not create wysh: ${err.stack}`
                }
            }

            console.log(`Successfully created wysh: ${params.Item.name}`);
            resp = {
                statusCode: 200,
                headers: {HEADERS},
                body: JSON.stringify(params.Item)
            };
            callback(null, resp);
        });
    }

}

module.exports = Wyshes;