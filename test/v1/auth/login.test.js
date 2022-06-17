const request = require('supertest');
const app = require('../../../app');

describe('POST /v1/auth/login', () => {
  it("should response with 201 as status code", async () => {
    const email = "mawang@binar.com";
    const password = "rahasia";

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({ email, password })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
          })
        );
      });
  });

  it("should response with 404 as status code", async () => {
    const email = "salah@binar.com";
    const password = "salah";

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({ email, password })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              details: expect.any(Object),
              message: expect.any(String),
              name: expect.any(String),
            },
          })
        );
      });
  });

  it("should response with 401 as status code", async () => {
    const email = "usertidakada@binar.com";
    const password = "usertidakada";

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({ email, password })
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              details: expect.any(Object),
              message: expect.any(String),
              name: expect.any(String),
            },
          })
        );
      });
  });
});