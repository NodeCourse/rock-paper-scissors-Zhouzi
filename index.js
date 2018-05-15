const express = require('express');
const choices = require('./choices.json');
const app = express();

app.set('view engine', 'pug');

app.use((req, res) => {
    res.render('home', { choices });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
