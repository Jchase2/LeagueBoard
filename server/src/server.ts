require("dotenv").config();
import express from "express";
import cors from "cors";
import { sequelize } from "./Models/index";
import { Region } from "./Models/region.model";
import {
  regionsNames,
  regionsCode,
  regions,
} from "./Utils/mockData/regionMock";
import errorHandler from "./Middleware/error";
import router from "./Routers/router";

var app = express();

const corsOptions = {
  exposedHeaders: "Authorization",
  origin: "https://hungry-bardeen-a12c9b.netlify.app",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

app.use(errorHandler);
(async () => {
  await sequelize.sync().then(() => {
    Region.destroy({ truncate: true });
    regionsCode.forEach((regionCode: string, i: number) => {
      Region.create({
        id: i + 1,
        code: regionCode,
        name: regionsNames[i],
        region: regions[i],
      });
    });
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
})();

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

module.exports = {
  server,
};
