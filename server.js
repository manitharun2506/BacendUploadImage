import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import envi from "./envi.js";
import UserRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json())

app.use(cors())

app.use(express.static("images"));//this is used for viewing purpose

mongoose.set("strictQuery", true);

mongoose.connect(envi.DATABASE_URL, (err) => {
  if (err) {
    console.log("ERROR in connecting DATABASE ERROR");
  } else {
    app.listen(envi.PORT, () => {
      console.log("SERVER listening in port : " + envi.PORT);
    });
  }
});

app.use(envi.API_URL,UserRouter)

