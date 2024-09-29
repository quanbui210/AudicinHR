const express = require('express')
const router = express.Router()


const {
    recommendBasedOnHRV, recommendBasedOnTime
} = require('../controller/trackControllerAdvanced')


router.get('/recommend', recommendBasedOnHRV)
router.get('/recommend-time', recommendBasedOnTime)


module.exports = router