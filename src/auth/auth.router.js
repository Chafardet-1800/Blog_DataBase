const router = require('express').Router()

const { Router } = require('express')
const authServices = require('./auth.http.js')

router.post('/login', authServices.login)

exports.router = router