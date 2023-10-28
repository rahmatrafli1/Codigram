require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./router");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
