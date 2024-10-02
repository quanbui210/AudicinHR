const express = require('express');
const router = express.Router();
const {
    recommendBasedOnHRV,
    recommendBasedOnTime,
} = require('../controller/trackControllerAdvanced');
const { getPurposes } = require('../controller/purposeController');

/**
 * @swagger
 * /recommend:
 *   post:
 *     tags:
 *       - Track Recommendation
 *     summary: Retrieve track recommendations based on heart rate and HRV
 *     description: Returns recommended tracks based on heart rate and heart rate variability data.
 *     operationId: getTrackRecommendation
 *     requestBody:
 *       description: Heart rate data for generating track recommendations
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               heartRateData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     unit:
 *                       type: string
 *                       description: The unit of measurement, e.g., 'count/min'
 *                     sdate:
 *                       type: integer
 *                       format: int64
 *                       description: Timestamp in milliseconds since epoch
 *                     value:
 *                       type: integer
 *                       description: Heart rate at the time of measurement
 *                     hrv:
 *                       type: integer
 *                       description: Heart rate variability at the time of measurement
 *           example:
 *             heartRateData:
 *               - { "unit": "count/min", "sdate": 1695542400000, "value": 72, "hrv": 50 }
 *               - { "unit": "count/min", "sdate": 1695542700000, "value": 68, "hrv": 55 }
 *               - { "unit": "count/min", "sdate": 1695543000000, "value": 65, "hrv": 60 }
 *               - { "unit": "count/min", "sdate": 1695543300000, "value": 95, "hrv": 35 }
 *               - { "unit": "count/min", "sdate": 1695543600000, "value": 110, "hrv": 25 }
 *               - { "unit": "count/min", "sdate": 1695543900000, "value": 125, "hrv": 18 }
 *               - { "unit": "count/min", "sdate": 1695544200000, "value": 80, "hrv": 45 }
 *               - { "unit": "count/min", "sdate": 1695544500000, "value": 85, "hrv": 40 }
 *               - { "unit": "count/min", "sdate": 1695544800000, "value": 90, "hrv": 38 }
 *               - { "unit": "count/min", "sdate": 1695545100000, "value": 98, "hrv": 30 }
 *               - { "unit": "count/min", "sdate": 1695545400000, "value": 102, "hrv": 28 }
 *               - { "unit": "count/min", "sdate": 1695545700000, "value": 120, "hrv": 22 }
 *               - { "unit": "count/min", "sdate": 1695546000000, "value": 55, "hrv": 65 }
 *               - { "unit": "count/min", "sdate": 1695546300000, "value": 60, "hrv": 62 }
 *               - { "unit": "count/min", "sdate": 1695546600000, "value": 58, "hrv": 63 }
 *               - { "unit": "count/min", "sdate": 1695546900000, "value": 78, "hrv": 48 }
 *               - { "unit": "count/min", "sdate": 1695547200000, "value": 115, "hrv": 20 }
 *               - { "unit": "count/min", "sdate": 1695547500000, "value": 105, "hrv": 24 }
 *               - { "unit": "count/min", "sdate": 1695547800000, "value": 50, "hrv": 70 }
 *               - { "unit": "count/min", "sdate": 1695548100000, "value": 75, "hrv": 52 }
 *               - { "unit": "count/min", "sdate": 1695548400000, "value": 108, "hrv": 26 }
 *               - { "unit": "count/min", "sdate": 1695548700000, "value": 118, "hrv": 21 }
 *     responses:
 *       '200':
 *         description: A list of track recommendations based on heart rate and HRV
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: integer
 *                         format: int64
 *                         description: Timestamp in milliseconds since epoch
 *                       heartRate:
 *                         type: integer
 *                         description: Heart rate at the time of recommendation
 *                       hrv:
 *                         type: integer
 *                         description: Heart rate variability at the time of recommendation
 *                       recommendation:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: Unique identifier for the track
 *                             track_name:
 *                               type: string
 *                               description: Name of the track
 *                             binaural_beat:
 *                               type: string
 *                               description: Type of binaural beat used in the track
 *                             frequency:
 *                               type: integer
 *                               description: Frequency of the binaural beat
 *                             tone:
 *                               type: string
 *                               description: Mood or tone of the track
 *                             purpose:
 *                               type: string
 *                               description: Intended purpose of the track (e.g., relaxation, focus)
 */



/**
 * @swagger
 * /recommend-time:
 *   get:
 *     tags:
 *       - Track Recommendation
 *     summary: Retrieve recommended tracks based on time of the day
 *     description: Returns recommended tracks tailored for various purposes such as focus, creativity, and work.
 *     operationId: getTrackRecommendationByTime
 *     responses:
 *       '200':
 *         description: A list of recommended tracks based on purpose
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the track
 *                       track_name:
 *                         type: string
 *                         description: Name of the track
 *                       binaural_beat:
 *                         type: string
 *                         description: Type of binaural beat used in the track
 *                       frequency:
 *                         type: integer
 *                         description: Frequency of the binaural beat
 *                       tone:
 *                         type: string
 *                         description: Mood or tone of the track
 *                       purpose:
 *                         type: string
 *                         description: Intended purpose of the track (e.g., relaxation, focus)
 */

/**
 * @swagger
 * /purposes:
 *   get:
 *     tags:
 *       - Purposes
 *     summary: Retrieve available purposes for tracks based on current time
 *     description: Returns a list of purposes that tracks can be tailored for.
 *     operationId: getPurposes
 *     responses:
 *       '200':
 *         description: A list of available purposes for tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 greetings:
 *                   type: string
 *                 message:
 *                   type: string
 *                 purposes:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: The purpose for which tracks can be recommended (e.g., focus, relaxation, creativity)
 */

router.post('/recommend', recommendBasedOnHRV);
router.get('/recommend-time', recommendBasedOnTime);
router.get('/purposes', getPurposes);

module.exports = router;
