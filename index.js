const express = require('express');
const randomItem = require('random-item');
const choices = require('./choices.json');
const app = express();

function getWinner(userChoice, computerChoice) {
    if (userChoice.winOver.includes(computerChoice.id)) {
        return userChoice;
    }

    if (computerChoice.winOver.includes(userChoice.id)) {
        return computerChoice;
    }

    return null;
}

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
    const winner = getWinner(userChoice, computerChoice);

    let winnerName;
    if (winner === userChoice) {
        winnerName = 'user';
    } else if (winner === computerChoice) {
        winnerName = 'computer';
    }

    res.render('play', { userChoice, computerChoice, winner, winnerName });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
