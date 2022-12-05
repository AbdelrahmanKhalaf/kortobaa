import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connection } from "./db/connection";
import morgan from "morgan";
// import userRoutes from "./router/user.routes";
import product from "./router/product.routes"
import auth from "./router/auth.routes"
import Joi from "joi";
import cors from "cors"
Joi.objectId = require("joi-objectid")(Joi);
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
/// middle wares for logger and express bodyParser
app
  .use(express.json())
  .use(morgan("dev"))
  .use(cors())
  .use("/uploads", express.static("uploads"))
  .use('/store/api/v1/product',product)
  .use('/store/api/v1/auth',auth)
  // unhandled Route
  .use("*", (req: Request, res: Response) => {
    res.status(404).send({ success: false, message_en: "UnHandled Route" });
  });
  app.listen(port, () => {
  console.log("listening on port : ", port);
  connection();
});
