import request from "supertest";
import app from "../../index";

describe("GET - api/v1/user/profile Testing user profile routes", () => {
  it("Should return a list of users", async () => {
    const res = await request(app).get("/api/v1/user/profile/all");
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.status).toEqual(true);
  });
});

describe("GET - api/v1/admin/profile/:id Testing user profile by id routes", () => {
  it("Should return a user by id", async () => {
    const res = await request(app).get("/api/v1/admin/profile/get/1");
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.status).toEqual(true);
  });
});
