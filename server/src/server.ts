require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { sequelize } from './Models/index';
import { Region } from './Models/region.model';
import { regionsNames, regionsCode, regions } from './Utils/mockData/regionMock';
const errorHandler = require('./middleware/error');
const router = require('./Routers/router');

var app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);


(async () => {
  await sequelize.sync({ force: true }).then(() => {
    regionsCode.forEach((regionCode:string, i: number) => {
      Region.create({code: regionCode, name: regionsNames[i], region: regions[i] });  
    });
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
})();

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

module.exports = {
  server,
};