const { verifyToken } = require('../utils/jwt')

const Authentication = (req,res,next) => { 
    try {
        const userToken = req.headers.authorization
        if(!userToken){
            console.log(`!userToken ${req.headers.authorization}`);
        }
        const token = userToken.split(' ')[1];
        const payload = verifyToken(token)
        // if(!payload){return res.status(401).send("UnAuthorized.");}
        if(!payload) {return res.status(401).send("UnAuthorized")}
        req.user = payload
        next()
    } catch (error) {
        console.error(error);
    }
}

module.exports = { Authentication }