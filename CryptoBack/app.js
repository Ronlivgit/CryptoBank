const express = require("express");
const cors = require("cors");
const app = express();

//! Routers area
const userRouter = require("./routes/user.routes");
const accountRouter = require("./routes/account.routes");

app.use(express.json());
app.use(cors());

//! app.use() api with route
app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);

module.exports = { app };
