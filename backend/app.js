import "dotenv/config";
import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import menuRouter from "./routers/menuRouter.js";
import orderRouter from "./routers/orderRouter.js";

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb connected!"))
  .catch((err) => console.log("Mongodb connection error", err));

//Configurations

//Middlewares
app.use(bodyParser.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Routes
app.use("/api/menu", menuRouter);
app.use("/api/order", orderRouter);

//Error Handling
app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000);
