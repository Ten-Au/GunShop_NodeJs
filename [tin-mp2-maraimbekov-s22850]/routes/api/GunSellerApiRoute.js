const express = require('express');
const router = express.Router();

const gunApiController = require('../../api/GunSellerAPI');

router.get('/', gunApiController.getGunSellers);
router.get('/:gunId', gunApiController.getGunSellerById);
router.post('/', gunApiController.createGunSeller);
router.put('/:gunId', gunApiController.updateGunSeller);
router.delete('/:gunId', gunApiController.deleteGunSeller);

module.exports = router;