var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var result = false;
    if (req.query.word === "член") {
        result = true;
    }
    res.send('result: ' + result);
});

app.listen(5000);
console.log("Try it now bitch http://localhost:5000/word=член");