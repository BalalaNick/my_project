const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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

exports.signup = (req, res) => {
    const { first_name, last_name, email, phone_number, username, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.json({ message: 'Passwords do not match.' });
    }

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.json({ message: 'Error hashing password.' });
        }

        const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
        connection.query(checkUserQuery, [username], (err, results) => {
            if (err) {
                return res.json({ message: 'Error checking username.' });
            }

            if (results.length > 0) {
                return res.json({ message: 'Username already exists.' });
            }

            const insertUserQuery = 'INSERT INTO users (first_name, last_name, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(insertUserQuery, [first_name, last_name, email, phone_number, username, hashedPassword], 
                (err, results) => {
                if (err) {
                    return res.json({ message: 'Error inserting user.' });
                }

                return res.json({ message: 'User registered successfully.' });
            });
        });
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    return res.json({
                        data: results[0],
                        message: 'Login successful.'
                    });
                } else {
                    return res.json({ message: 'Invalid password.' });
                }
            });
        } else {
            return res.json({ message: 'User not found.' });
        }
    });
};

exports.updateDetails = (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, phone_number } = req.body;

    const sql = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE user_id = ?';
    connection.query(sql, [first_name, last_name, email, phone_number, userId], (err, results) => {
        if (err) throw err;

        if (results.affectedRows > 0) {
            return res.json({ message: 'User details updated successfully.' });
        } else {
            return res.json({ message: 'User not found.' });
        }
    });
};

exports.changePassword = (req, res) => {
    const { username, old_password, new_password, confirm_new_password } = req.body;

    if (new_password !== confirm_new_password) {
        return res.send('New passwords do not match');
    }

    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            return res.send('Error checking username');
        }

        if (results.length === 0) {
            return res.send('Username not found');
        }

        bcrypt.compare(old_password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.send('Old password is incorrect');
            }

            bcrypt.hash(new_password, 10, (err, hash) => {
                if (err) throw err;

                const updatePasswordQuery = 'UPDATE users SET password = ? WHERE username = ?';
                connection.query(updatePasswordQuery, [hash, username], (err, result) => {
                    if (err) throw err;
                    res.send('Password changed successfully');
                });
            });
        });
    });
};




/*
exports.signup = async (req, res) => {
    const { first_name, last_name, email, phone_number, username, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.json({ message: 'Passwords do not match.' });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if username already exists
        const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
        connection.query(checkUserQuery, [username], async (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                return res.status(400).json({ message: 'Username already exists.' });
            }

            // Insert new user
            const insertUserQuery = 'INSERT INTO users (first_name, last_name, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(insertUserQuery, [first_name, last_name, email, phone_number, username, hashedPassword], (err, results) => {
                if (err) throw err;

                return res.status(201).json({ message: 'User registered successfully.' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}; */


// change password usename validation pas confpass
// business b id bisness name user id  //inser update del
//business
