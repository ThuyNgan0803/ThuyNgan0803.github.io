let human = "X";
let humanWins = 0;
let computer = "O";
let computerWins = 0;
let turn = human;

function nextMove(button) {
    setMove(button);
    if (checkForWin() == 1) {
        humanWins++;
        alert("You win...");
        document.getElementById("human").innerHTML = humanWins;
        resetGame();
        return;
    } else if (checkForWin() == 2) {
        computerWins++;
        alert("You lost...");
        document.getElementById("computer").innerHTML = computerWins;
        resetGame();
        return;
    } else if (checkForWin() == 3) {
        alert("No score");
        resetGame();
        return;
    }
    switchTurn();
    computerTurn();
    if (checkForWin() == 1) {
        humanWins++;
        alert("You win...");
        document.getElementById("human").innerHTML = humanWins;
        resetGame();
        return;
    } else if (checkForWin() == 2) {
        alert("You lost...");
        computerWins++;
        document.getElementById("computer").innerHTML = computerWins;
        resetGame();
        return;
    } else if (checkForWin() == 3) {
        alert("No score");
        resetGame();
        return;
    }
    switchTurn();
}

function switchFirstTurn() {
    if (human == "X") {
        human = "O";
        computer = "X";
    } else {
        human = "X";
        computer = "O";
    }
}

function switchTurn() {
    if (turn == human) {
        turn = computer;
    } else {
        turn = human;
    }
}

function setMove(button) {
    button.value = turn;
    button.innerHTML = turn;
    button.disabled = true;
}

function computerTurn() {
    let panel = document.getElementById("panel").getElementsByTagName("button");
    for (let i = 0; i < panel.length; i++) {
        if (panel[i].value == "") {
            panel[i].value = computer;
            if (checkForWin()) {
                setMove(panel[i]);
                return;
            }
            panel[i].value = "";
        }
    }
    for (let i = 0; i < panel.length; i++) {
        if (panel[i].value == "") {
            panel[i].value = human;
            if (checkForWin()) {
                setMove(panel[i]);
                return;
            }
            panel[i].value = "";
        }
    }
    let move;
    do {
        move = parseInt(Math.random() * 10 - 1);
    } while (panel[move].value != "");
    setMove(panel[move]);
}

function checkForWin() {
    let panel = document.getElementById("panel").getElementsByTagName("button");
    let matrix = [];
    let counter = 0;
    let winner = 3;
    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = panel[counter++].value;
            if (matrix[i][j] == "")
                winner = 0;
        }
    }
    for (let i = 0; i < 3; i++) {
        if ((matrix[i][0] == human && matrix[i][1] == human && matrix[i][2] == human) || (matrix[0][i] == human && matrix[1][i] == human && matrix[2][i] == human)) {
            winner = 1;
        }
        if ((matrix[i][0] == computer && matrix[i][1] == computer && matrix[i][2] == computer) || (matrix[0][i] == computer && matrix[1][i] == computer && matrix[2][i] == computer)) {
            winner = 2;
        }
    }
    if ((matrix[0][0] == human && matrix[1][1] == human && matrix[2][2] == human) || (matrix[0][2] == human && matrix[1][1] == human && matrix[2][0] == human))
        winner = 1;
    if ((matrix[0][0] == computer && matrix[1][1] == computer && matrix[2][2] == computer) || (matrix[0][2] == computer && matrix[1][1] == computer && matrix[2][0] == computer))
        winner = 2;

    return winner;
}

function resetGame() {
    var buttons = document.getElementById("panel").getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].value = "";
        buttons[i].innerHTML = "";
    }
    switchFirstTurn();
    turn = "X";
    if (computer == "X") {
        computerTurn();
        switchTurn();
    }
}