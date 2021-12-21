const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.listen(process.env.PORT || 5000, () => {
  console.log(`SERVER IS RUNNING ON PORT : 5000`);
});
