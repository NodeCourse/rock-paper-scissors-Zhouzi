const express = require('express');
const randomItem = require('random-item');
const choices = require('./choices.json');
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { choices });
});

app.get('/play/:choice', (req, res) => {
    const userChoice = choices.find((choice) => {
        return choice.id === req.params.choice;
    });
    const computerChoice = randomItem(choices);
    res.render('play', { userChoice, computerChoice });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
