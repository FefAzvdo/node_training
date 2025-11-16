import request from "supertest";
import app from "../app";

describe("Auth", () => {
  it("should login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "demo@mail.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
