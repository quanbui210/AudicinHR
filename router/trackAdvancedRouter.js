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
