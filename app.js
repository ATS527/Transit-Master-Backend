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
  origin: ["http://127.0.0.1:4000", "http://127.0.0.1:5500", "https://tm.ceal.club","https://tmserver.ceal.club"],
  credentials: true,
}));

const adminRouter = require("./routes/admin_route");
const stationMasterRouter = require("./routes/station_master_route");
const clientRouter = require("./routes/client_route");
const studentRouter = require("./routes/student_route");
const nfcCardRequestsRouter = require("./routes/nfc_card_requests_route");
const nfcCardRouter = require("./routes/nfc_card_route");
const busRouter = require("./routes/bus_route");
const routeRouter = require("./routes/route_route");
const busRouteRouter = require("./routes/bus_routes_route");
const bookingRouter = require("./routes/booking_route");
const stopRouter = require("./routes/stop_route");

//express serve public folder as static
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v2", adminRouter);
app.use("/api/v2", stationMasterRouter);
app.use("/api/v2", clientRouter);
app.use("/api/v2", studentRouter);
app.use("/api/v2", nfcCardRequestsRouter);
app.use("/api/v2", nfcCardRouter);
app.use("/api/v2", busRouter);
app.use("/api/v2", routeRouter);
app.use("/api/v2", busRouteRouter);
app.use("/api/v2", bookingRouter);
app.use("/api/v2", stopRouter);

app.get("/", (req, res) => {
  res.end("Hello from transit-master-server");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT + "...")
});