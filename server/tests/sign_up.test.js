// for registerUser in controller/auth.js

const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const User = require('../models/user');

let server;

describe('POST /registerUser', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should add a new user', async () => {
    // Mock request body

    const mockUser = {
      _id: '65e9b58910afe6e94fc6e6fe',
      email : "jest@gmail.com",
      password : "password123"
    }

    // Mocking the save method of the User model prototype
    User.prototype.save = jest.fn().mockResolvedValueOnce(mockUser);

    // Making the request
    const response = await supertest(server)
      .post('/user/registerUser')
      .send(mockUser);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Your account has been successfully created.');

  });
});
