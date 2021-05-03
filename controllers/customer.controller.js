const Customer = require('../models/customer.model.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Create a Project
    const customer = new Customer({
        customer_name: req.body.customer_name,
        customer_contact: req.body.customer_contact,
        customer_email: req.body.customer_email,
        customer_street: req.body.customer_street,
        customer_brgy: req.body.customer_brgy,
        customer_city: req.body.customer_city,
        customer_province: req.body.customer_province,
        customer_region: req.body.customer_region
    });

    // Save Customer in the database
    Customer.create(customer, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || `Error: ${err}`,
            });
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    // Create a Customer

    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.',
            });
        else res.send(data);
    });
};

