const sql = require('./db.js');

// constructor

const Schedule = function (schedule) {
    this.schedule_customer = schedule.schedule_customer
    this.schedule_job = schedule.schedule_job
    this.schedule_status = schedule.schedule_status
    this.schedule_date = schedule.schedule_date
    this.schedule_created = schedule.schedule_created
    this.schedule_time = schedule.schedule_time
    this.schedule_remark = schedule.schedule_remark
    this.schedule_total = schedule.schedule_total
    this.schedule_received = schedule.schedule_received
    this.schedule_encoded = schedule.schedule_encoded
    this.schedule_type = schedule.schedule_type

};

Schedule.create = (newSchedule, result) => {
    sql.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        sql.query(`INSERT INTO schedules SET ?`, newSchedule, function (err, res) {
            if (err) {
                return sql.rollback(function () {
                    throw err;
                });
            }

            sql.commit(function (err) {
                if (err) {
                    return sql.rollback(function () {
                        throw err;
                    });
                }
                console.log('Success');
                console.log('created project: ');
                result(null, {
                    payload: newSchedule,
                    status: 'success',
                    insert_id: res.insertId,
                    message: 'User successfully created :)',
                });
            });
        });
    });
};
Schedule.getAll = (result) => {
    sql.query('SELECT * FROM schedules INNER JOIN customers on schedules.schedule_customer = customers.customer_id', (err, res) => {
        if (err) {
            console.log('err: ', err);
            result(null, err);
            return;
        }
        console.log('users: ', res);
        result(null, res);
    });
};
module.exports = Schedule;
