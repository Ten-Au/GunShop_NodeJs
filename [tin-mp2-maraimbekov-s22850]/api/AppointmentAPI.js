const AppointmentRepository = require('../repository/mysql2/AppointmentRepository');


exports.getAppointments = (req, res, next) => {
    AppointmentRepository.getAppointments()
        .then(apps => {
            res.status(200).json(apps)
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getAppointmentById = (req, res, next) => {
    const appId = req.params.appId;
    AppointmentRepository.getAppointmentById(appId)
        .then(cus => {
            if(!cus) {
                res.status(404).json({
                    message: 'Appointment with id: '+appId+' not found'
                })
            } else {
                res.status(200).json(cus);
            }
        });
};

exports.createAppointment = (req, res, next) => {
    AppointmentRepository.createAppointment(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateAppointment = (req, res, next) => {
    const appId = req.params.appId;
    AppointmentRepository.updateAppointment(appId, req.body)
        .then(result => {
            res.status(200).json({message: 'Appointment updated!', cus: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAppointment = (req, res, next) => {
    const appId = req.params.appId;
    AppointmentRepository.deleteAppointment(appId)
        .then(result => {
            res.status(200).json({message: 'Removed appointment', apps: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteManyAppointments = (req, res, next) => {
    const appIds = req.params.appIds;
    AppointmentRepository.deleteAppointment(appIds)
        .then(result => {
            res.status(200).json({message: 'Removed appointments', apps: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
        })
}