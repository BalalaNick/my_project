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


exports.insertTransection = (req, res) => {
    const { bid, cid, user_id, date, remark, amount, category_type } = req.body;
    const query = 'INSERT INTO transection (bid, cid, user_id, date, remark, amount, category_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [bid, cid, user_id, date, remark, amount, category_type], (err, results) => {
        if (err) {
            console.error('Error inserting:', err);
            res.status(500).send({ message: 'Error inserting data' });
        } else {
            res.send({ message: 'Data inserted successfully' });
        }
    });
};


exports.updateTransection = (req, res) => {
    const { transection_id } = req.params;
    const { bid, cid, user_id, date, remark, amount, category_type } = req.body;
    const query = 'UPDATE transection SET bid = ?, cid = ?, user_id = ?, date = ?, remark = ?, amount = ?, category_type = ? WHERE transection_id = ?';
    connection.query(query, [bid, cid, user_id, date, remark, amount, category_type, transection_id], (err, results) => {
        if (err) {
            console.error('Error updating:', err);
            res.status(500).send({ message: 'Error updating data' });
        } else {
            res.send({ message: 'Data updated successfully' });
        }
    });
};


exports.deleteTransection = (req, res) => {
    const { transection_id } = req.params;
    const query = 'DELETE FROM transection WHERE transection_id = ?';
    connection.query(query, [transection_id], (err, results) => {
        if (err) {
            console.error('Error deleting:', err);
            res.status(500).send({ message: 'Error deleting data' });
        } else {
            res.send({ message: 'Data deleted successfully' });
        }
    });
};

exports.getTransectionRecords = (req, res) => {
    const bid = req.params.bid;

    if (bid) {
        // If bid is provided, fetch aggregated data for the specific business
        const query = `
            SELECT 
                b.business_name,
                t.transection_id, t.bid, t.cid, t.user_id, t.date, t.remark, t.amount, t.category_type,
                (SELECT SUM(amount) FROM transection WHERE bid = ? AND category_type = 'Cash In') AS total_income,
                (SELECT SUM(amount) FROM transection WHERE bid = ? AND category_type = 'Cash Out') AS total_expense,
                ((SELECT SUM(amount) FROM transection WHERE bid = ? AND category_type = 'Cash In') - 
                (SELECT SUM(amount) FROM transection WHERE bid = ? AND category_type = 'Cash Out')) AS net_balance
            FROM 
                transection t
            JOIN 
                business b ON t.bid = b.bid
            WHERE 
                t.bid = ?
        `;
        
        connection.query(query, [bid, bid, bid, bid, bid], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send({ message: 'Error fetching data' });
            } else {
                // Process results to extract year-wise data
                const transactions = results.filter(item => item.transection_id); // Remove aggregated columns
                const yearWiseData = {};
                let totalIncome = 0;
                let totalExpense = 0;
                
                transactions.forEach(transaction => {
                    const year = new Date(transaction.date).getFullYear();
                    if (!yearWiseData[year]) {
                        yearWiseData[year] = { total_income: 0, total_expense: 0 };
                    }
                    
                    if (transaction.category_type === 'Cash In') {
                        yearWiseData[year].total_income += parseFloat(transaction.amount);
                        totalIncome += parseFloat(transaction.amount);
                    } else {
                        yearWiseData[year].total_expense += parseFloat(transaction.amount);
                        totalExpense += parseFloat(transaction.amount);
                    }
                });

                const netBalance = totalIncome - totalExpense;

                res.json({
                    business_name: results[0]?.business_name || "N/A",
                    yearWiseData,
                    totalIncome,
                    totalExpense,
                    netBalance
                });
            }
        });
    } else {
        // If bid is not provided, fetch all transaction records
        const query = 'SELECT * FROM transection';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send({ message: 'Error fetching data' });
            } else {
                res.json({ transactions: results });
            }
        });
    }
};



