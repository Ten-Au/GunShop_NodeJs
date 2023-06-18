const CustomerRepository = require('../repository/mysql2/CustomerRepository');
const authUtil = require('../utils/authUtils');

const adminPhone = "228 228 228"
const adminPassword = "admin"

const admin = {
    phoneNumber: adminPhone,
    password: adminPassword
}

const hashAdmin = authUtil.hashPassword(adminPassword)

exports.login = (req, res, next) => {
    const phone = req.body.phoneNumber;
    const password = req.body.password;

    console.log(phone + ' ' + password);
    CustomerRepository.findByPhoneNumber(phone)
        .then(cus => {
            if(phone !== adminPhone && !cus) {
                console.log('ADD')
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid phone number or password"
                })
            } else if(authUtil.comparePasswords(password, hashAdmin) === true && phone === adminPhone) {
                req.session.loggedUser = admin;
                req.session.admin = true;
                res.redirect('/');
            } else if(authUtil.comparePasswords(password, cus.password) === true) {
                req.session.loggedUser = cus;
                res.redirect('/');
            }  else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid phone number or password"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    req.session.admin = false;
    res.redirect('/');
}