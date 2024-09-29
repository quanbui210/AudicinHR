const express = require('express')
const router = express.Router()


const {
    recommendBasedOnHRV, recommendBasedOnTime
} = require('../controller/trackControllerAdvanced')

const {getPurposes} = require("../controller/purposeController")


router.get('/recommend', recommendBasedOnHRV)
router.get('/recommend-time', recommendBasedOnTime)
router.get('/purposes', getPurposes)



module.exports = router