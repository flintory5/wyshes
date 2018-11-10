const createWyshes = require('../../createWyshes');
const Wysh = require('../../Wyshes');

describe('createWysh', () => {
    // mock the db
    const db = {};
    db.put = jest.fn((params, callback) => {
        callback(null, {});
    }).mockName('db.put');
    const dbMock = {};
    dbMock.db = db;
    dbMock.tableName = 'gyft-wyshes-table-dev';

    const wysh = new Wysh(dbMock);

    const name = 'ge smart light switch';
    const description = 'light switches for the basement';
    const url = 'www.ge.com/smart-switches';
    const price = 130;

    const body = {
        "name": name,
        "description": description,
        "url": url,
        "price": price
    }
    
    const req = {
        "body": JSON.stringify(body)
    }

    it('Calls the post method once', () => {
        wysh.saveWysh(body, () => {});
        expect(dbMock.db.put.mock.calls).toHaveLength(1);
    });

    it('Calls the put method with the correct arguments', () => {
        wysh.saveWysh(body, () => {});

        expect(dbMock.tableName).toBe('gyft-wyshes-table-dev');
        expect(dbMock.db.put.mock.calls[1][0].Item).toHaveProperty('name', 'ge smart light switch');
        expect(dbMock.db.put.mock.calls[1][0].Item).toHaveProperty('description', 'light switches for the basement');
        expect(dbMock.db.put.mock.calls[1][0].Item).toHaveProperty('url', 'www.ge.com/smart-switches');
        expect(dbMock.db.put.mock.calls[1][0].Item).toHaveProperty('price', 130);
    });

    it('Receives a response with a status of 200', () => {
        wysh.saveWysh(body, (err, res) => {
            expect(res.statusCode).toBe(200);
        });
    });

    
});