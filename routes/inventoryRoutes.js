const express  = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventory,getInventory, getDonors, getHospital, getOrganization, getOrganizationForHospital, getInventoryHospital, getRecentInventories } = require('../controllers/inventoryController')

const router = express.Router()

//add inventory
router.post('/create-inventory',authMiddleware,createInventory)
// get all blood records
router.get('/get-inventory',authMiddleware,getInventory)
// get recent blood records
router.get('/get-recent-inventory',authMiddleware,getRecentInventories)
// get hospital blood records
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospital)
// get donors records
router.get('/get-donors',authMiddleware,getDonors)
// get hospital records
router.get('/get-hospitals',authMiddleware,getHospital)
// get organization records
router.get('/get-organizations',authMiddleware,getOrganization)

router.get('/get-organizations-for-hospital',authMiddleware,getOrganizationForHospital)

module.exports = router