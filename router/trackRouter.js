const express = require('express')
const router = express.Router()
const {getPurposes, recommend} = require('../controller/trackController')

router.get('/recommend', recommend)
router.get('/purposes', getPurposes)


module.exports = router