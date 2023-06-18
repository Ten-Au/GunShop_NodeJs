const CustomerRepository = require('../repository/mysql2/CustomerRepository');

exports.showCustomerList = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(custs => {
            res.render('Pages/Customers/list', {
                custs: custs,
                navLocation: 'customers'
            });
        });
}
exports.showAddCustomerForm = (req, res, next) => {
    res.render('Pages/Customers/form', {
        cus: {},
        pageTitle: 'New customer',
        formMode: 'createNew',
        btnLabel: 'Add customer',
        formAction: '/customers/add',
        navLocation: 'customers',
        validationErrors: []
    })
}
exports.showCustomerDetails = (req, res, next) => {
    const cusId = req.params.cusId;
    CustomerRepository.getCustomerById(cusId)
        .then(cus => {
            res.render('Pages/Customers/form', {
                cus: cus,
                formMode: 'showDetails',
                pageTitle: 'Customer details',
                formAction: '',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}
exports.showCustomerEdit = (req, res, next) => {
    const cusId = req.params.cusId;
    CustomerRepository.getCustomerById(cusId)
        .then(cus => {
            res.render('Pages/Customers/form', {
                cus: cus,
                formMode: 'edit',
                pageTitle: 'Edit customer',
                btnLabel: 'Edit customer',
                formAction: '/customers/edit',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}

exports.addCustomer = (req, res, next) => {
    const cusData = {...req.body};
    CustomerRepository.createCustomer(cusData)
        .then( result => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('Pages/Customers/form', {
                cus: cusData,
                pageTitle: 'Adding a customer',
                formMode: 'createNew',
                btnLabel: 'Add customer',
                formAction: '/customers/add',
                navLocation: 'customers',
                validationErrors: err.details
            })
        });
};

exports.updateCustomer = (req, res, next) => {
    const cusId = req.body._id;
    const cusData = {...req.body};
    CustomerRepository.updateCustomer(cusId, cusData)
        .then(result => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('Pages/Customers/form', {
                cus: cusData,
                pageTitle: 'Editing a customer',
                formMode: 'edit',
                btnLabel: 'Edit customer',
                formAction: '/customers/edit',
                navLocation: 'customers',
                validationErrors: err.details
            })
        });
};

exports.deleteCustomer = (req, res, next) => {
    const cusId = req.params.cusId;
    CustomerRepository.deleteCustomer(cusId)
        .then( () => {
            res.redirect('/customers');
        });
};

