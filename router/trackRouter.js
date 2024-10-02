const express = require('express')
const router = express.Router()
const {recommend} = require('../controller/trackController')

router.post('/recommend', recommend)

module.exports = router