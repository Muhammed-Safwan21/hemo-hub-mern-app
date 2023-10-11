const express = require('express')
const { getDonorList, getHospitalList, getOrgList, deleteDonor, deleteHospital, deleteOrg } =require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router() 

// get donor list
router.get('/donor-list', authMiddleware, adminMiddleware ,getDonorList)
// get hospital list
router.get('/hospital-list', authMiddleware, adminMiddleware ,getHospitalList)
// get org list
router.get('/org-list', authMiddleware, adminMiddleware ,getOrgList)


// delete donor
router.delete('/delete-donor/:id',authMiddleware, adminMiddleware ,deleteDonor)
// delete hospital
router.delete('/delete-hospital/:id',authMiddleware, adminMiddleware ,deleteHospital)
// delete hospital
router.delete('/delete-org/:id',authMiddleware, adminMiddleware ,deleteOrg)

module.exports = router;