const wyshDatabase = require('../wyshes/wyshDatabase');
const HEADERS = 'headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}';

class Wyshes {

    constructor(db) {
        this.wyshDb = db;
    }

    saveWysh(body, callback) {
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
        console.log("Body:\n", body);
        console.log("Item:\n", params.Item);        
        
        const resp = this.wyshDb.db.put(params, (err, wysh) => {
            if (err) {
                console.log(`createWyshes ERROR=${err.stack}`);
                return {
                    statusCode: 400,
                    headers: HEADERS,
                   error: `Could not create wysh: ${err.stack}`
                }
            }

            console.log(JSON.stringify(wysh));
            console.log(`Successfully created wysh: ${params.Item.name}`);
            response = {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify(params.Item)
            };

            callback(null, response);
        });
    }

}

module.exports = Wyshes;