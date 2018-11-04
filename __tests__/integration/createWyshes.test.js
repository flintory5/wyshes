const createWyshes = require('../../createWyshes');

const id = Date.now().toString();
const context = {};

const body = {
    "name": "ge smart light switch",
    "description": "light switches for the basement",
    "url": "www.ge.com/smart-switches",
    "price": 130
}

const req = {
    "body": JSON.stringify(body)
}

const res = {
    "body": {
        "wyshId": id,
        "name": "ge smart light switch",
        "description": "light switches for the basement",
        "url": "www.ge.com/smart-switches",
        "price": 130

    }
}

test('correct wysh is created', () => {
    expect(createWyshes.handler(req, context)).toBe(res);
});