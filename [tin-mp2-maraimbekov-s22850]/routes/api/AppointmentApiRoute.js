const express = require('express');
const router = express.Router();

const appApiController = require('../../api/AppointmentAPI');

router.get('/', appApiController.getAppointments);
router.get('/:appId', appApiController.getAppointmentById);
router.post('/', appApiController.createAppointment);
router.put('/:appId', appApiController.updateAppointment);
router.delete('/:appId', appApiController.deleteAppointment);
router.delete('/:appIds', appApiController.deleteManyAppointments);

module.exports = router;