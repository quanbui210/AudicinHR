const express = require('express')
const router = express.Router()
const {recommend} = require('../controller/trackController')

router.get('/recommend', recommend)

module.exports = router