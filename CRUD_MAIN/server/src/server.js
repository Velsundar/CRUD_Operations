import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import bodyParser from 'body-parser';
import dotenv from "dotenv";

import customersRoutes from "./Routes/customerDetails.route.js";

const app = express();
dotenv.config({
  path: path.resolve("./../.env"),
});

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use("/", customersRoutes);

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}\nMongoDB is connected`)
    )
  )
  .catch((error) => console.log(error.message));
