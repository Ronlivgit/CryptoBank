const { Router } = require('express')
const router = Router()
const { User } = require('../models/user.model')
const { registerUser , logUser } = require('../controllers/user.controller')
const { Authentication } = require('../middleware/authentication')

router.post('/register', registerUser)

router.post('/login' , logUser)



module.exports = router