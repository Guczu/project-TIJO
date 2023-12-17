const request = require('supertest');
import server from '../../app.js';

beforeAll((done) => {
  setTimeout(() => {
      done();
  }, 1000);
});

describe('User Authentication Endpoint', () => {
  it('should authenticate user and return status 200 with token', async () => {
    const response = await request(server)
      .post('/api/user/auth')
      .send({ name: 'mojanazwa', password: 'haslo' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});

describe('User Authentication Endpoint', () => {
  it('should not authenticate user and return status 400', async () => {
    const response = await request(server)
      .post('/api/user/auth')
      .send({ name: 'nieistniejacanazwa', password: 'blednehaslo' });

    expect(response.status).toBe(404);
  });
});

// describe('User Create Endpoint', () => {
//   it('should create a new user and return status 200 with result', async () => {

//     const response = await request(server)
//       .post('/api/user/create')
//       .send({ 
//         name: 'newuser26', 
//         email: 'newuser26@example.com', 
//         password: 'newpassword', 
//         confirmpassword: 'newpassword'
//       });

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expect.objectContaining({
//       id: expect.any(String),
//       password: expect.any(String),
//       userId: expect.any(String),
//     }));
//   });
// });

// describe('User Token Retrieval Endpoint', () => {
//   it('should retrieve user token by userId and return status 200 with token', async () => {
//     const userId = '64fcb422df2deec02079dfa5';

//     const response = await request(server)
//       .get(`/api/user/token?userId=${userId}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('value');
//   });
// });

// describe('User Logout Endpoint', () => {
//   it('should logout user and return status 200 with result', async () => {
//     const userId = '64fcb422df2deec02079dfa5';

//     const response = await request(server)
//       .post('/api/user/logout')
//       .send({ userId: userId });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('deletedCount', 1);
//   });
// });

// describe('User Token Retrieval Endpoint after Logout', () => {
//   it('should check user token by userId and return status 404', async () => {
//     const userId = '64fcb422df2deec02079dfa5';

//     const response = await request(server)
//       .get(`/api/user/token?userId=${userId}`);

//     expect(response.status).toBe(404);
//   });
// });