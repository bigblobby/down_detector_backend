import request from 'supertest';
import app from '../server/index.js';

describe('GET /', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    })
})