"use strict";

import express, { json } from "express";
import routes from "./src/routes/roverNavigation.js";
import {} from "dotenv/config";

const app = express();

app.use(json());

app.use("/api", routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("The server is running on port : " + listener.address().port);
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  return res.status(404).json({
    message: error.message,
  });
});
