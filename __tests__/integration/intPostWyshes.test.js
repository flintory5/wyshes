const createWyshes = require('../../createWyshes');
const stackOutput = require('../../.build/stack.json');

const url = stackOutput.ServiceEndpoint;
const req = require('supertest')(url);

const id = Date.now().toString();
const context = {};

const body = {
    "name": "ge smart light switch",
    "description": "light switches for the basement",
    "url": "www.ge.com/smart-switches",
    "price": 130
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

describe('createWyshes', () => {
    it('correct wysh is created', () => {
        return req
            .post('/wyshes')
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .send(body)
            .expect(200)
            .then((res) => {
                expect(res).toBeDefined();
            });
    });
});