const sql = require('./db.js');

// constructor

const Users = function (user) {
    this.user_name = user.user_name;
    this.user_username = user.user_username;
    this.user_password = user.user_password;
    this.user_type = user.user_type;
    this.user_created = user.user_created;
};

Users.create = (newUser, result) => {
    sql.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        sql.query(`INSERT INTO users SET ?`, newUser, function (err, res) {
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
                    payload: newUser,
                    status: 'success',
                    insert_id: res.insertId,
                    message: 'User successfully created :)',
                });
            });
        });
    });
};
Users.getAll = (result) => {
    sql.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('err: ', err);
            result(null, err);
            return;
        }
        console.log('users: ', res);
        result(null, res);
    });
};

Users.authenticate = (user, result) => {

    console.log(user)

    sql.query("SELECT * FROM users WHERE `user_username` = '" + user.user_username + "' AND `user_password` = '" + user.user_password + "'", (err, res) => {
        if (err) {
            console.log('err: ', err);
            result(null, err);
            return;
        }
        console.log('users: ', res);
        result(null, res);
    });
};

module.exports = Users;
