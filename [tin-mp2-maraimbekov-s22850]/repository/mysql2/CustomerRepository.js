const db = require('../../config/mysql2/db');
const cusSchema = require('../../model/joi/Customer');
const authUtil = require('../../utils/authUtils');



checkPhoneNumberUnique = (phoneNumber, cusId) => {
    let sql, promise;
    if (cusId) {
        sql = `SELECT COUNT(1) as c FROM Customer where _id != ? and phoneNumber = ?`;
        promise = db.promise().query(sql, [cusId, phoneNumber]);
    } else {
        sql = `SELECT COUNT(1) as c From Customer where phoneNumber = ?`;
        promise = db.promise().query(sql, [phoneNumber]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['phoneNumber'],
                    message: 'The entered phone number is already in use'
                }]
            };
        }
        return err;
    });
}

exports.getCustomers = () => {
    return db.promise().query('SELECT * From Customer')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getCustomerById = (cusId) => {
    const query = `SELECT c._id as _id, c.firstName, c.lastName, c.nickName, c.phoneNumber, c.password,
    app._id as app_id, app.date, app.location,
    gun._id as gun_id, gun.gunNick, gun.experience, gun.salary
    FROM Customer c
    left join Appointment app on app.cus_id = c._id
    left join Gun_Seller gun on app.gun_id = gun._id
    where c._id = ?`

    return db.promise().query(query, [cusId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }

            const cus = {
                _id: parseInt(cusId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                nickName: firstRow.nickName,
                phoneNumber: firstRow.phoneNumber,
                password: firstRow.password,
                appointments: []
            }

            for( let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                if(row.app_id) {
                    const appointment = {
                        _id: row.app_id,
                        date: row.date,
                        location: row.location,
                        gunSeller: {
                            _id: row.gun_id,
                            gunNick: row.gunNick,
                            experience: row.experience,
                            salary: row.salary
                        }
                    };
                    cus.appointments.push(appointment);
                }
            }
            return cus;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.findByPhoneNumber = (phoneNumber) => {
    const sql = `SELECT _id, phoneNumber, password FROM Customer where phoneNumber = ?`

    return db.promise().execute(sql, [phoneNumber])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return undefined;
            }

            const cus = {
                _id: firstRow._id,
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                phoneNumber: firstRow.phoneNumber,
                password: firstRow.password
            }

            return cus;
        })
};

exports.createCustomer = async (newCusData) => {
    const vRes = cusSchema.validate(newCusData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkPhoneNumberUnique(newCusData.phoneNumber)
        .then(phoneNumErr => {
            if(Object.entries(phoneNumErr).length !== 0) {
                return Promise.reject(phoneNumErr);
            } else {
                const firstName = newCusData.firstName;
                const lastName = newCusData.lastName;
                const nickName = newCusData.nickName;
                const phoneNumber = newCusData.phoneNumber;
                const password = newCusData.password;
                const hashPassword = authUtil.hashPassword(password);

                const sql = 'INSERT into Customer (firstName, lastName, nickName, phoneNumber, password) VALUES (?, ?, ?, ?, ?)';
                return db.promise().execute(sql, [firstName, lastName, nickName, phoneNumber, hashPassword]);
            }
        })
        .catch(err => {
            return Promise.reject(err)
        });
};


exports.updateCustomer = (cusId, cusData) => {
    const vRes = cusSchema.validate(cusData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkPhoneNumberUnique(cusData.phoneNumber, cusId)
        .then(phoneNumErr => {
            if(Object.entries(phoneNumErr).length !== 0) {
                return Promise.reject(phoneNumErr);
            } else {
                const firstName = cusData.firstName;
                const lastName = cusData.lastName;
                const nickName = cusData.nickName;
                const phoneNumber = cusData.phoneNumber;
                const password = cusData.password;
                const hashPassword = authUtil.hashPassword(password);

                var sql;
                if (password == "") {
                    sql = 'UPDATE Customer set firstName = ?, lastName = ?, nickName = ?, phoneNumber = ? where _id = ?';
                    return db.promise().execute(sql, [firstName, lastName, nickName, phoneNumber, cusId]);
                } else {
                    sql = 'UPDATE Customer set firstName = ?, lastName = ?, nickName = ?, phoneNumber = ?, password = ? where _id = ?';
                    return db.promise().execute(sql, [firstName, lastName, nickName, phoneNumber, hashPassword, cusId]);
                }
            }
        })
        .catch(err => {
            return Promise.reject(err)
        });
};

exports.deleteCustomer = (cusId) => {
    const sql1 = 'DELETE FROM Appointment app where cus_id = ?'
    const sql2 = 'DELETE FROM Customer where _id = ?'

    return db.promise().execute(sql1, [cusId])
        .then(() => {
            return db.promise().execute(sql2, [cusId])
        });
};