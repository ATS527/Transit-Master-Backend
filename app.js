const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));

//express serve public folder as static
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.end("Hello from transit-master-server");
});