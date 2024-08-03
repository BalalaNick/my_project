const mysql = require('mysql2');

var connection = mysql.createConnection({
    // host: '9az.h.filess.io',
    // user: 'usermanagement01_attention',
    // password: '31f75beb2b6de83acc32aaed3a2d532c94c7c022',
    // database: 'usermanagement01_attention',
    // port: '3307'
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'usermanagement'
});

connection.connect(function (err) {
  if (err) {
      console.log(err);
  } else {
      console.log('Database connected.');
  }
});


exports.createBusinessCategory = (req, res) => {
    const { category_name, bid, user_id, category_type } = req.body;
    const query = 'INSERT INTO businesscategory (category_name, bid, user_id, category_type) VALUES (?, ?, ?, ?)';
    connection.query(query, [category_name, bid, user_id, category_type], (err, results) => {
        if (err) {
            console.error('error inserting:', err);
            res.status(500).send({ message: 'Error inserting data' });
        } else {
            res.send({ message: 'Data inserted successfully' });
        }
    });
};

exports.updateBusinessCategory = (req, res) => {
    const { cid } = req.params;
    const { category_name, bid, user_id, category_type } = req.body;
    const query = 'UPDATE businesscategory SET category_name = ?, bid = ?, user_id = ?, category_type = ? WHERE cid = ?';
    connection.query(query, [category_name, bid, user_id, category_type, cid], (err, results) => {
        if (err) {
            console.error('error updating:', err);
            res.status(500).send({ message: 'Error updating data' });
        } else {
            res.send({ message: 'Data updated successfully' });
        }
    });
};

exports.deleteBusinessCategory = (req, res) => {
    const { cid } = req.params;
    const query = 'DELETE FROM businesscategory WHERE cid = ?';
    connection.query(query, [cid], (err, results) => {
        if (err) {
            console.error('error deleting:', err);
            res.status(500).send({ message: 'Error deleting data' });
        } else {
            res.send({ message: 'Data deleted successfully' });
        }
    });
};

