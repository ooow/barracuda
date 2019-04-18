const express = require('express');
const app = express();

const badWords = [
    "ебать",
    "блядь",
    "хуй",
    "хер",
    "елда",
    "муде",
    "пизда",
    "манда",
    "дрочить",
    "залупа",
    "пидарас",
    "гандон",
    "малафья",
    "срать",
    "ссать",
    "пердеть",
    "дристать",
    "говно",
    "жопа",
    "целка",
    "курва",
];

app.use(cors());

app.get('/', function (req, res) {
    let result = false;
    if (req.query.word === "член") {
        result = true;
    }
    res.send('result: ' + result);
});

app.listen(5000);
console.log("Try it now bitch http://localhost:5000?word=123");
