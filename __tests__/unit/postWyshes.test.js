const createWyshes = require('../../createWyshes');
const Wysh = require('../../Wyshes');

describe('createWysh', () => {
    // mock the db
    const db = {};
    db.put = jest.fn((params) => {}).mockName('db.put');
    db.put.promise = jest.fn(() => {}).mockName('db.put.promise');
    const dbMock = {};
    dbMock.db = db;
    dbMock.tableName = 'gyft-wyshes-table-dev';

    const wysh = new Wysh(dbMock, 'dev', true);

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
});