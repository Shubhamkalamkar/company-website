const logincontroller = require('../../controllers/auth/login/login.auth.controller')

const authRoute = require('express').Router()

authRoute.post('/login',logincontroller)

module.exports = authRoute