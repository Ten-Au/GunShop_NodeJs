const CustomerRepository = require('../repository/mysql2/CustomerRepository');


exports.getCustomers = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(custs => {
            res.status(200).json(custs)
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getCustomerById = (req, res, next) => {
    const cusId = req.params.cusId;
    CustomerRepository.getCustomerById(cusId)
        .then(cus => {
            if(!cus) {
                res.status(404).json({
                    message: 'Customer with id: '+cusId+' not found'
                })
            } else {
                res.status(200).json(cus);
            }
        });
};

exports.createCustomer = (req, res, next) => {
    console.log(req.body);
    CustomerRepository.createCustomer(req.body)
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

exports.updateCustomer = (req, res, next) => {
    const cusId = req.params.cusId;
    console.log(req.body);
    CustomerRepository.updateCustomer(cusId, req.body)
        .then(result => {
            res.status(200).json({message: 'Customer updated!', cus: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteCustomer = (req, res, next) => {
    const cusId = req.params.cusId;
    CustomerRepository.deleteCustomer(cusId)
        .then(result => {
            res.status(200).json({message: 'Removed customer', cus: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}