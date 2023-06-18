const CustomerRepository = require('../repository/mysql2/CustomerRepository');
const config = require("../config/auth/key")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password

    CustomerRepository.findByPhoneNumber(phoneNumber)
        .then(user => {
            if (user == undefined) {
                return res.status(401).send({ message: "Invalid phone number or password!" })
            }


            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({ message: "Invalid phone number or password!" })
                    }
                    const token = jwt.sign(
                        {
                            phoneNumber: user.phoneNumber,
                            userId: user._id,
                        },
                        config.secret,
                        { expiresIn: '1h' }
                    )
                    res.status(200).json({ token: token, userId: user._id })
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}