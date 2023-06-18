const db = require('../../config/mysql2/db');
const gunSchema = require('../../model/joi/GunSeller');

checkNickNameUnique = (gunNick, gunId) => {
    let sql, promise;
    if (gunId) {
        sql = `SELECT COUNT(1) as c FROM Gun_Seller where _id != ? and gunNick = ?`;
        promise = db.promise().query(sql, [gunId, gunNick]);
    } else {
        sql = `SELECT COUNT(1) as c From Gun_Seller where gunNick = ?`;
        promise = db.promise().query(sql, [gunNick]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['gunNick'],
                    message: 'The entered nick name already exists'
                }]
            };
        }
        return err;
    });
}

exports.getGunSellers = () => {
    return db.promise().query('SELECT * From Gun_Seller')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getGunSellerById = (gunId) => {
    const query = `SELECT gun._id as _id, gun.gunNick, gun.experience, gun.salary,
    app._id as app_id, app.date, app.location,
    c._id as c_id, c.firstName, c.lastName, c.nickName, c.phoneNumber
    FROM Gun_Seller gun
    left join Appointment app on app.gun_id = gun._id
    left join Customer c on app.cus_id = c._id
    where gun._id = ?`

    return db.promise().query(query, [gunId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }

            const gun = {
                _id: parseInt(gunId),
                gunNick: firstRow.gunNick,
                experience: firstRow.experience,
                salary: firstRow.salary,
                appointments: []
            }

            for( let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                if(row.app_id) {
                    const appointment = {
                        _id: row.app_id,
                        date: row.date,
                        location: row.location,
                        customer: {
                            _id: row.c_id,
                            firstName: row.firstName,
                            lastName: row.lastName,
                            nickName: row.nickName,
                            phoneNumber: row.phoneNumber
                        }
                    };
                    gun.appointments.push(appointment);
                }
            }
            return gun;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};

exports.createGunSeller = (newGunData) => {
    const vRes = gunSchema.validate(newGunData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkNickNameUnique(newGunData.gunNick)
        .then(gunNickErr => {
            if(Object.entries(gunNickErr).length !== 0) {
                return Promise.reject(gunNickErr);
            } else {
                const gunNick = newGunData.gunNick;
                const experience = newGunData.experience;
                const salary = newGunData.salary;
                const sql = 'INSERT into Gun_Seller (gunNick, experience, salary) VALUES (?, ?, ?)';
                return db.promise().execute(sql, [gunNick, experience, salary]);
            }
        })
        .catch(err => {
            return Promise.reject(err)
        });
};

exports.updateGunSeller = (gunId, gunData) => {
    const vRes = gunSchema.validate(gunData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    return checkNickNameUnique(gunData.gunNick, gunId)
        .then(gunNickErr => {
            if(Object.entries(gunNickErr).length !== 0) {
                return Promise.reject(gunNickErr);
            } else {
                const gunNick = gunData.gunNick;
                const experience = gunData.experience;
                const salary = gunData.salary;
                const sql = 'UPDATE Gun_Seller set gunNick = ?, experience = ?, salary = ? where _id = ?';
                return db.promise().execute(sql, [gunNick, experience, salary, gunId]);
            }
        })
        .catch(err => {
            return Promise.reject(err)
        });
};

exports.deleteGunSeller = (gunId) => {
    const sql1 = 'DELETE FROM Appointment app where gun_id = ?'
    const sql2 = 'DELETE FROM Gun_Seller where _id = ?'

    return db.promise().execute(sql1, [gunId])
        .then(() => {
            return db.promise().execute(sql2, [gunId])
        });
};