const AppointmentRepository = require("../repository/mysql2/AppointmentRepository");
const CustomerRepository = require("../repository/mysql2/CustomerRepository");
const GunSellerRepository = require("../repository/mysql2/GunSellerRepository");
const {all} = require("express/lib/application");

exports.showAppointmentList = (req, res, next) => {
    AppointmentRepository.getAppointments()
        .then(apps => {
            res.render('Pages/Appiontments/list', {
                apps: apps,
                navLocation: 'appointments'
            });
        });
}
exports.showAddAppointmentForm = (req, res, next) => {
    let customers, gunSellers;

    AppointmentRepository.getAppointments()
        .then(apps => {
            appointments = apps;
            return CustomerRepository.getCustomers();
        })
        .then(custs => {
            customers = custs;
            return GunSellerRepository.getGunSellers()
        })
        .then(guns => {
            gunSellers = guns;
            res.render('Pages/Appiontments/form', {
                app: {},
                customers: customers,
                gunSellers: gunSellers,
                pageTitle: 'New Appointment',
                formMode: 'createNew',
                btnLabel: 'Add Appointment',
                formAction: '/appointments/add',
                navLocation: 'appointments',
                validationErrors: []
            })
        })
}
exports.showAppointmentDetails = (req, res, next) => {
    const appId = req.params.appId;
    let customers, gunSellers;

    CustomerRepository.getCustomers()
        .then(custs => {
            customers = custs;
            return GunSellerRepository.getGunSellers();
        })
        .then(guns => {
            gunSellers = guns;
            return AppointmentRepository.getAppointmentById(appId)
        })
        .then(app => {
            res.render('Pages/Appiontments/form', {
                app: app,
                customers: customers,
                gunSellers: gunSellers,
                formMode: 'showDetails',
                pageTitle: 'Appointment details',
                formAction: '',
                navLocation: 'appointments',
                validationErrors: []
            });
        });
}
exports.showAppointmentEdit = (req, res, next) => {
    const appId = req.params.appId;
    let customers, gunSellers, appointments;

    AppointmentRepository.getAppointments()
        .then(apps => {
            appointments = apps;
            return CustomerRepository.getCustomers();
        })
        .then(custs => {
            customers = custs;
            return GunSellerRepository.getGunSellers();
        })
        .then(guns => {
            gunSellers = guns;
            return AppointmentRepository.getAppointmentById(appId)
        })
        .then(app => {
            res.render('Pages/Appiontments/form', {
                app: app,
                customers: customers,
                gunSellers: gunSellers,
                appointments: appointments,
                formMode: 'showEdit',
                pageTitle: 'Edit Appointment',
                btnLabel: 'Edit Appointment',
                formAction: '/appointments/edit',
                navLocation: 'appointments',
                validationErrors: []
            });
        });
}

exports.addAppointment = (req,res,next) => {
    let allCustomers, allGunSellers, allAppointments
    const appData = {...req.body};

    AppointmentRepository.createAppointment(appData)
        .then(result => {
            res.redirect('/appointments');
        })
        .catch(err => {
            const cusPromise = CustomerRepository.getCustomers();
            const gunPromise = GunSellerRepository.getGunSellers();
            Promise.all([cusPromise, gunPromise])
                .then(([custs, guns]) => {
                    res.render('Pages/Appiontments/form', {
                        app: appData,
                        customers: custs,
                        gunSellers: guns,
                        pageTitle: 'Adding an appointment',
                        formMode: 'createNew',
                        btnLabel: 'Add appointment',
                        formAction: '/appointments/add',
                        navLocation: 'appointments',
                        validationErrors: err.details
                    })
            })
        })
};

exports.updateAppointment = (req, res, next) => {
    const appId = req.body._id;
    const appData = {...req.body};

    const app = AppointmentRepository.getAppointmentById(appId);

    AppointmentRepository.updateAppointment(appId, appData)
        .then(result => {
            res.redirect('/appointments');
        })
        .catch(err => {
            const cusPromise = CustomerRepository.getCustomers();
            const gunPromise = GunSellerRepository.getGunSellers();
            Promise.all([cusPromise, gunPromise])
                .then(([custs, guns]) => {
                    res.render('Pages/Appiontments/form', {
                        app: appData,
                        customers: custs,
                        gunSellers: guns,
                        pageTitle: 'Editing an appointment',
                        formMode: 'edit',
                        btnLabel: 'Edit appointment',
                        formAction: '/appointments/edit',
                        navLocation: 'appointments',
                        validationErrors: err.details
                    })
                })
        })
}

exports.deleteAppointment = (req, res, next) => {
    const appId = req.params.appId;

    AppointmentRepository.deleteAppointment(appId)
        .then(() => {
            res.redirect('/appointments');
        });
}