const request = require('supertest');
import server from '../../app.js';

beforeAll((done) => {
  setTimeout(() => {
      done();
  }, 1000);
});

describe('Discount Code in Cart', () => {
    it('should check correct discount code and return status 200 with code informations', async () => {
        const code = "MINUS30";

      const response = await request(server)
        .get(`/api/discount-code?code=${code}`)
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('code');
    });
});

describe('Discount Code in Cart', () => {
    it('should check wrong discount codes and return status 404', async () => {
        const code = "MINUS31";

      const response = await request(server)
        .get(`/api/discount-code?code=${code}`)
  
      expect(response.status).toBe(404);
    });
});

describe('Create Payment', () => {
    it('should create payment and return status 200', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZjYzI3NWRmMmRlZWMwMjA3OWRmYjEiLCJuYW1lIjoibmF6d2EiLCJyb2xlIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNzAyNTY2NjkyLCJleHAiOjE3MDI1Nzc0OTJ9.4BF16mr1sjwVWs6ckoiAIlF8rumTtDCcTYvywilHUk0';
        
        const response = await request(server)
          .post('/api/payment/create-payment')
          .set('Authorization', `Bearer ${token}`) 
          .set('Content-Type', 'application/json')
          .send({ items: [{"product_name": "produkt", "price": 90, "quantity": 1}], deliveryPrice: 10, discountValue: 10, cartValue: 90 });
    
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
      });
});

describe('Create Payment', () => {
  it('should not create payment because of wrong token provided and return status 400', async () => {
      const token = 'wrongtoken';
      
      const response = await request(server)
        .post('/api/payment/create-payment')
        .set('Authorization', `Bearer ${token}`) 
        .set('Content-Type', 'application/json')
        .send({ items: [{"product_name": "produkt", "price": 90, "quantity": 1}], deliveryPrice: 10, discountValue: 10, cartValue: 90 });
  
      expect(response.status).toBe(400);
    });
});

describe('Check Payment', () => {
    it('should check payment and return status 200 with data', async () => {

        const response = await request(server)
          .post('/api/payment/check-session')
          .send({ sessionId: 'cs_test_b1Rvb73rYo1WJSFrWD5KVO1MVPW1eM4iF4FILnLo6FIRQ3Q5oQg5oGJq4m' });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('payment_status');
      });
});

describe('Check Payment', () => {
    it('should check payment and return status 404', async () => {

        const response = await request(server)
          .post('/api/payment/check-session')
          .send({ sessionId: 'cs_test_b1WbSXUaP9w0bXQam0pnIegiXX4J2eNAZaLZxkHZ0VvXNuxQeuHyk34DL9' });
    
        expect(response.status).toBe(500);
      });
});

describe('User has filled address', () => {
    it('should check address and return status 200', async () => {
        const userId = "64fcc275df2deec02079dfb1";

      const response = await request(server)
        .get(`/api/address/get?userId=${userId}`)
  
      expect(response.status).toBe(200);
      expect(response.body).not.toEqual(expect.objectContaining({
        city: ' ',
        postalCode: ' ',
        phoneNumber: ' ',
        lastName: ' ',
        firstName: ' ',
        locality: ' '
    }));
    });
});

describe('User has not filled address', () => {
    it('should check address and return status 200', async () => {
        const userId = "6519aa516dc54810ea6e29c1";

      const response = await request(server)
        .get(`/api/address/get?userId=${userId}`)
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({
        city: ' ',
        postalCode: ' ',
        phoneNumber: ' ',
        lastName: ' ',
        firstName: ' ',
        locality: ' '
    }));
    });
});
