const wyshDatabase = require('../wyshes/wyshDatabase');
const HEADERS = 'headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}';

class Wyshes {

    constructor(db, stage, offline) {
        if (db == null) {
            this.wyshDb = new wyshDatabase(stage, offline);
        }
    }

    async saveWysh(name, description, url, price) {
        let params = {
            TableName: this.wyshDb.tableName,
            Item: {
              "wyshId": Date.now().toString(),
              "name": name,
              "description": description,
              "url": url,
              "price": price
            }
        }
        console.log("Item:\n", params.Item);        
        
        try {
            const resp = await this.wyshDb.db.put(params).promise();
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
    }

}

module.exports = Wyshes;