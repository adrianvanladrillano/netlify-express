const sql = require('./db.js');

// constructor

const Customers = function (customer) {
    this.customer_name = customer.customer_name;
    this.customer_contact = customer.customer_contact;
    this.customer_email = customer.customer_email;
    this.customer_street = customer.customer_street;
    this.customer_brgy = customer.customer_brgy;
    this.customer_city = customer.customer_city;
    this.customer_province = customer.customer_province;
    this.customer_region = customer.customer_region;
};

Customers.create = (newCustomer, result) => {
    sql.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        sql.query(`INSERT INTO customers SET ?`, newCustomer, function (err, res) {
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
                result(null, {
                    payload: newCustomer,
                    status: 'success',
                    insert_id: res.insertId,
                    message: 'User successfully created :)',
                });
            });
        });
    });
};
Customers.getAll = (result) => {
    sql.query('SELECT * FROM customers', (err, res) => {
        if (err) {
            console.log('err: ', err);
            result(null, err);
            return;
        }
        console.log('customers: ', res);
        result(null, res);
    });
};
module.exports = Customers;
