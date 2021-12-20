import express from "express";

import "./database/connection";
import cors from "cors";
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("swagger_output.json");
import { router } from "./router/router";
import { endpoints } from "./router/router";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

endpoints(app);

app.listen(3333, () => {
  console.log("Server running");
});
