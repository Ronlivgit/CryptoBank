const express = require("express");
const cors = require("cors");
const app = express();


//! Routers area
const userRouter = require("./routes/user.routes");
const bnsRouter = require("./routes/bns.routes");
const operatorRouter = require('./routes/operator.routes')
const creditCardRouter = require('./routes/creditCard.routes')
const portfolioRouter = require('./routes/portfolio.routes')

app.use(express.json());
app.use(cors());

//! app.use() api with route
app.use("/api/user", userRouter);
app.use("/api/bns", bnsRouter);
app.use("/api/operator", operatorRouter);
app.use("/api/card", creditCardRouter);
app.use("/api/invest", portfolioRouter);


module.exports = { app };