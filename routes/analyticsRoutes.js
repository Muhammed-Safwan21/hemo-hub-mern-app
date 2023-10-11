const express  = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { bloodGroupDetails } = require('../controllers/analyticsController')

const router = express.Router()
// get blood data
router.get('/bloodGroups-data',authMiddleware,bloodGroupDetails)


module.exports = router