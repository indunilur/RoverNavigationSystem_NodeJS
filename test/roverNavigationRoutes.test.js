import routes from "../src/routes/roverNavigation.js";
import request from "supertest";
import express from "express";
import bodyParser from "body-parser";

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

describe("Add Grid", function () {
  const body = {
    xCoordinate: "5",
    yCoordinate: "5",
  };

  test("responds to /grid", async () => {
    const res = await request(app).post("/grid").send(body);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toEqual("Successfully Created");
  });
});

describe("Add Rover, Navigate and Retrieve the position", function () {
  const addRoverBody = {
    xCoordinate: "1",
    yCoordinate: "2",
    direction: "N",
  };

  test("responds to /rover", async () => {
    const addRoverRes = await request(app).post("/rover").send(addRoverBody);
    expect(addRoverRes.statusCode).toBe(201);
    expect(addRoverRes.body.xCoordinate).toEqual(1);
    expect(addRoverRes.body.yCoordinate).toEqual(2);
    expect(addRoverRes.body.direction).toEqual("N");

    const roverId = addRoverRes.body.roverID.toString();
    expect(roverId.length).toBeGreaterThan(0);

    const navigateRoverBody = {
      command: "LMLMLMLMM",
      roverId: roverId,
    };

    const navigateRoverRes = await request(app)
      .put("/rover")
      .send(navigateRoverBody);
    expect(navigateRoverRes.statusCode).toBe(200);
    expect(navigateRoverRes.body.xCoordinate).toEqual(1);
    expect(navigateRoverRes.body.yCoordinate).toEqual(3);
    expect(navigateRoverRes.body.direction).toEqual("N");
    expect(navigateRoverRes.body.roverID).toEqual(parseInt(roverId));

    const retrieveRoverRes = await request(app).get("/rover/" + roverId);
    expect(retrieveRoverRes.statusCode).toBe(200);
    expect(retrieveRoverRes.body.xCoordinate).toEqual(1);
    expect(retrieveRoverRes.body.yCoordinate).toEqual(3);
    expect(retrieveRoverRes.body.direction).toEqual("N");
    expect(retrieveRoverRes.body.roverID).toEqual(parseInt(roverId));
  });
});
