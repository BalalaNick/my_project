const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: '9az.h.filess.io',
    user: 'usermanagement01_attention',
    password: '31f75beb2b6de83acc32aaed3a2d532c94c7c022',
    database: 'usermanagement01_attention',
    port: '3307'
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected.');
    }
});


exports.createBusiness = (req, res) => {
    const { business_name, user_id } = req.body;
    const query = 'INSERT INTO business (business_name, user_id) VALUES (?, ?)';
    connection.query(query, [business_name, user_id], (err, results) => {
        if (err) {
            console.error('error inserting:', err);
            res.status(500).send({ message: 'Error inserting data' });
        } else {
            res.send({ message: 'Data inserted successfully' });
        }
    });
};

exports.updateBusiness = (req, res) => {
    const { bid } = req.params;
    const { business_name, user_id } = req.body;
    const query = 'UPDATE business SET business_name = ?, user_id = ? WHERE bid = ?';
    connection.query(query, [business_name, user_id, bid], (err, results) => {
        if (err) {
            console.error('error updating:', err);
            res.status(500).send({ message: 'Error updating data' });
        } else {
            res.send({ message: 'Data updated successfully' });
        }
    });
};

exports.deleteBusiness = (req, res) => {
    const { bid } = req.params;
    const query = 'DELETE FROM business WHERE bid = ?';
    connection.query(query, [bid], (err, results) => {
        if (err) {
            console.error('error deleting:', err);
            res.status(500).send({ message: 'Error deleting data' });
        } else {
            res.send({ message: 'Data deleted successfully' });
        }
    });
};
