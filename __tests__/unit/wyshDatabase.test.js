const wyshDatabase = require('../../wyshDatabase');

describe('wyshDatabase', () => {

    it('Creates an offline database', () => {
        const wyshDb = new wyshDatabase('dev', true);

        expect(wyshDb.offline).toEqual(true);
        expect(wyshDb.tableName).toEqual('gyft-wyshes-table-dev');
        expect(wyshDb.db.options.region).toEqual('localhost');
        expect(wyshDb.db.options.endpoint).toEqual('http://localhost:8000');
    });

    it('Creates an online database', () => {
        const wyshDb = new wyshDatabase('dev', false);

        expect(wyshDb.db.service.config.endpoint).toEqual('dynamodb.undefined.amazonaws.com');
    });
});