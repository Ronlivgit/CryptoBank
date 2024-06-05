const { app } = require("./app")

const mongoose = require("mongoose")
const {config} = require('./config/config')


mongoose.connect(config.MONGO_URL)
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{console.error(err);})

const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log(`Server is Live port is : ${PORT}`);
})



