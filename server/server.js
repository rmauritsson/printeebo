const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const port = process.env.PORT || 8000;

// Import Routes
//const authRoutes = require("./routes/auth.js");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE CONNECTED SUCCESSFULLY"))
  .catch((err) => console.log("DATABASE CONNECTION ERROR:", err));

// middleware
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

//routes
//app.use("/api", authRoutes);
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

// port

app.listen(port, () => console.log(`Server listening on port ${port}`));
