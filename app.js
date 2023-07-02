const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

require("./config/db");
const adminRouter = require("./routes/admin_route");
const stationMasterRouter = require("./routes/station_master_route");
const clientRouter = require("./routes/client_route");
const studentRouter = require("./routes/student_route");
const nfcCardRequestsRouter = require("./routes/nfc_card_requests_route");
const nfcCardRouter = require("./routes/nfc_card_route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: ["http://localhost:3000","http://localhost:5500","https://tm.govindsr.me","https://transitserver.govindsr.me"],
  credentials: true,
}));

//express serve public folder as static
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v2", adminRouter);
app.use("/api/v2", stationMasterRouter);
app.use("/api/v2", clientRouter);
app.use("/api/v2", studentRouter);
app.use("/api/v2", nfcCardRequestsRouter);
app.use("/api/v2", nfcCardRouter);



app.get("/", (req, res) => {
  res.end("Hello from transit-master-server");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + "...")
});