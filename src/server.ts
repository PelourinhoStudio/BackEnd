import express from "express";
import { router } from "./router/router";
import "./database/connection";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log("Server running");
});
