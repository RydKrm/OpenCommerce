import request from "supertest";
import app from "../../index";

describe("Testing Order API ", () => {
  it("Should it create a new order", async () => {
    const res = await request(app).post("/api/v1/order/crud/create");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should it fetch all orders", async () => {
    const res = await request(app).get("/api/v1/order/crud/all");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("Should it return the order list by user id", async () => {
    const res = await request(app).get(`/api/v1/order/crud/get-by-user/1`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should it return the order list by vendor id", async () => {
    const res = await request(app).get(`/api/v1/order/crud/get-by-vendor/1`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should it fetch orders by delivery date", async () => {
    const res = await request(app).get(
      `/api/v1/order/crud/get-by-delivery-date/2022-12-25`
    );
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should it fetch orders by delivery status", async () => {
    const res = await request(app).get(
      `/api/v1/order/crud/get-by-delivery-status/DELIVERED`
    );
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should return the list of order by vendor and status", async () => {
    const res = await request(app).get(
      `/api/v1/order/crud/get-by-vendor-status/1/DELIVERED`
    );
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should it fetch a single order", async () => {
    const res = await request(app).get(`/api/v1/order/crud/get/1`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should it update a single order", async () => {
    const res = await request(app).patch(`/api/v1/order/crud/update/1`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Does it update a order status", async () => {
    const res = (
      await request(app).put(`/api/v1/order/crud/update-status/1`)
    ).body({
      status: "DELIVERED",
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it("Should it delete a single order", async () => {
    const res = await request(app).delete(`/api/v1/order/crud/delete/1`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });
});
