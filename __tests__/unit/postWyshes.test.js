const createWyshes = require('../../createWyshes');

describe('createWyshes', () => {
    // mock the db
    const dbMock = {};
    dbMock.put = jest.fn((params, callback) {
        callback(null, {});
    }).mockName('db.put');
});