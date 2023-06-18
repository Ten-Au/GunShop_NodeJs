const express = require('express');
const router = express.Router();
const gunSellerController = require('../controllers/gunSellerController');
router.get('/', gunSellerController.showGunSellerList);
router.get('/add', gunSellerController.showAddGunSellerForm);
router.get('/details/:gunId', gunSellerController.showGunSellerDetails);
router.get('/edit/:gunId', gunSellerController.showGunSellerEdit);
router.post('/add', gunSellerController.addGunSeller);
router.post('/edit', gunSellerController.updateGunSeller);
router.get('/delete/:gunId', gunSellerController.deleteGunSeller)
module.exports = router;