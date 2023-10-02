import express from "express";
import env from "./environment.config";
import login from "./routes/login";
require("dotenv").config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", env.ENVIRONMENT);
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", login);

app.listen(env.PORT, () => console.log(`Server started on port ${env.PORT}`));
