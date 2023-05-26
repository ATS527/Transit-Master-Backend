const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminRouter = require("./routes/admin_route");
const stationMasterRouter = require("./routes/station_master_route");
const clientRouter = require("./routes/client_route");
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

app.use("/api/v2", adminRouter);
app.use("/api/v2", stationMasterRouter);
app.use("/api/v2", clientRouter);

app.get("/", (req, res) => {
  res.end("Hello from transit-master-server");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + "...")
});