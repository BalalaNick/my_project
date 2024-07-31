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

// echo "# my_project" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/BalalaNick/my_project.git
// git push -u origin main



// git remote add origin https://github.com/BalalaNick/my_project.git
// git branch -M main
// git push -u origin main