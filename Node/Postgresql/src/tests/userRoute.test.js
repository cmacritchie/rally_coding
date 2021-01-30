const request = require('supertest')
const app = require('../app')

test('Should Signup a new User', async () => {
    await request(app).post('/api/user').send({
        name: 'testUser',
        email: 'tester@test.com',
        password: 'password1'
    }).expect(201)
})