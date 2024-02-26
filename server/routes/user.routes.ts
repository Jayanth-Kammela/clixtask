import express from 'express'
const router = express.Router()
const { userSignUp, userSignIn } = require("../controllers/user.controller")
//auth
router.post('/signup', userSignUp)
router.post('/signin', userSignIn)

module.exports = router;