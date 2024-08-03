const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Node API" });
});

require('./route.js')(app);

app.listen(3000, function () {
    console.log("Server running on: " + 3000);
});
// or create a new repository on the command line
// echo "# my_project" >> README.md
// git init
// git add *
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/BalalaNick/my_project.git
// git push -u origin main


//or push an existing repository from the command line
//
// git add *
// git commit -m "second commit"
// git push -u origin main




// transection tid bid cid date remark amount ctype 
//in u del
// amount bid  year wise transection i out net balace  (if pas bid then  else all ) (bname in out net balance)
// income  out (total transection by year ) ex (slary by year)  (category pas ) 
// expence


// 1) if i pass bid then it filter record via else it shows all record that avalibe in tabel
//2) in if part  shows me year wise transection of that business  so first i get business name then business total income and expence year wise  and also right now current balance 



