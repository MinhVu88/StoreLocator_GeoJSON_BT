const path = require("path");
const express = require("express");
const cors = require("cors");
const config = require("config");
const port = process.env.PORT || config.get("PORT");
const stores = require("./routes/storeRoutes");
const connectDB = require("./config/db");

// connect to mongodb
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/v1/stores", stores);

app.listen(port, () =>
  console.log(
    `server's listening on port ${port} in ${config.get("NODE_ENV")} mode`
  )
);
