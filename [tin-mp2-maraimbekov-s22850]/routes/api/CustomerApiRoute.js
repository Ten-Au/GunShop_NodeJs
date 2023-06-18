const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const cusApiController = require('../../api/CustomerAPI');

router.get('/', cusApiController.getCustomers);
router.get('/:cusId', cusApiController.getCustomerById);
router.post('/', isAuth, cusApiController.createCustomer);
router.put('/:cusId', cusApiController.updateCustomer);
router.delete('/:cusId', isAuth, cusApiController.deleteCustomer);

module.exports = router;