import express from "express";

import "./database/connection";
import cors from "cors";
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../swagger_output.json");
import { router } from "./router/router";
import { endpoints } from "./router/router";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*"
}));

app.use(router);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

endpoints(app);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server running");
});
