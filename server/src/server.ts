import * as dotenv from "dotenv";
import express from 'express';
import cors from 'cors';

dotenv.config();
var app = express();

app.use(cors());
app.use(express.json());

//Use routes

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

module.exports = {
  server,
};