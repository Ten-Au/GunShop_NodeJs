const db = require('../../config/mysql2/db');
const appSchema = require('../../model/joi/Appointment');


exports.getAppointments = () => {
    const query = `SELECT app._id as app_id, app.date, app.location,
    gun._id as gun_id, gun.gunNick, gun.experience, gun.salary,
    c._id as cus_id, c.firstName, c.lastName, c.nickName, c.phoneNumber
    FROM Appointment app
    left join Customer c on app.cus_id = c._id
    left join Gun_Seller gun on app.gun_id = gun._id`

    return db.promise().query(query)
        .then( (results, fields) => {
            const appointments = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const appointment = {
                    _id: row.app_id,
                    date: row.date,
                    location: row.location,
                    gunSeller: {
                        _id: row.gun_id,
                        gunNick: row.gunNick,
                        experience: row.experience,
                        salary: row.salary
                    },
                    customer: {
                        _id: row.c_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        nickName: row.nickName,
                        phoneNumber: row.phoneNumber
                    }
                };
                appointments.push(appointment);
            }
            console.log(appointments);
            return appointments;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAppointmentById = (appId) => {
   const query = `SELECT app._id as app_id, app.date, app.location,
   gun._id as gun_id, gun.gunNick, gun.experience, gun.salary,
   c._id as cus_id, c.firstName, c.lastName, c.nickName, c.phoneNumber
   FROM Appointment app
   left join Customer c on app.cus_id = c._id
   left join Gun_Seller gun on app.gun_id = gun._id
   where app._id = ?`

    return db.promise().query(query, [appId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return [];
            }
            console.log(row)
            const appointment = {
                _id: appId,
                date: row.date,
                location: row.location,
                gunSeller: {
                    _id: row.gun_id,
                    gunNick: row.gunNick,
                    experience: row.experience,
                    salary: row.salary,
                },
                customer: {
                    _id: row.cus_id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    nickName: row.nickName,
                    phoneNumber: row.phoneNumber
                }
            };
            console.log(appointment);
            return appointment;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createAppointment = (data) => {
    const vRes = appSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const sql = 'INSERT into Appointment (cus_id, gun_id, date, location) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [data.cId, data.gunId, data.date, data.location]);
};

exports.updateAppointment = (appId, data) => {
    const vRes = appSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const sql = `UPDATE Appointment set cus_id = ?, gun_id = ?, date = ?, location = ? where _id = ?`;
    return db.promise().execute(sql, [data.cId, data.gunId, data.date, data.location, appId]);
};

exports.deleteAppointment = (appId) => {
    const sql = 'DELETE FROM Appointment where _id = ?'
    return db.promise().execute(sql, [appId]);
};

exports.deleteManyAppointments = (appIds) => {
    const sql = 'DELETE FROM Appointment where _id IN (?)'
    return db.promise().execute(sql, [appIds]);
};