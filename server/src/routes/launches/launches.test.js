import request from "supertest";
import app from "../../app.js";
import { connectToDB, disconnectFromDB } from "../../services/mongo.js";

beforeAll(async () => {
  await connectToDB();
});

afterAll(async () => {
  await disconnectFromDB();
});

describe("GET /launches", () => {
  it("returns 200 status if all launches are retrieved", async () => {
    const response = await request(app)
      .get("/launches")
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});

describe("POST /launches", () => {
  const completeLaunchToSave = {
    launchDate: "June 21, 2027",
    mission: "Peregrine Mission One",
    rocket: "Vulcan Centaur (ULA)",
    target: "Kepler-296 A e",
  };

  const launchToSaveWithoutLaunchDate = {
    mission: "Peregrine Mission One",
    rocket: "Vulcan Centaur (ULA)",
    target: "Kepler-296 A e",
  };

  const completeLaunchToSaveWithWrongDate = {
    launchDate: "Lorem Ipsum",
    mission: "Peregrine Mission One",
    rocket: "Vulcan Centaur (ULA)",
    target: "Kepler-296 A e",
  };

  it("returns 201 status if a launch created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchToSave)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);

    const completeLaunchToSaveDate = new Date(
      completeLaunchToSave.launchDate,
    ).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(completeLaunchToSaveDate);

    expect(response.body).toMatchObject(launchToSaveWithoutLaunchDate);
  });

  it("returns 400 status if there is no launchDate", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchToSaveWithoutLaunchDate)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual({
      error: "Missing required launch field",
    });
  });

  it("returns 400 status if the date is not valid", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchToSaveWithWrongDate)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toStrictEqual({ error: "Date is invalid" });
  });
});
