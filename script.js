

const boardElement = document.querySelector('#board');
const headerDisplay = document.querySelector('#display');
const popUp = document.querySelector('#popUpMenu');
const p1input = document.querySelector('#p1Input');
const p2input = document.querySelector('#p2Input');
const versusBtn = document.querySelector('#versusBtn');
const resetBtn = document.querySelector('#resetBtn');
const newGameBtn = document.querySelector('#newGameBtn');
const startBtn = document.querySelector('#startGameBtn');

const p1name = document.querySelector('#p1name');
const p1symbol = document.querySelector('#p1symbol');
const p1wins = document.querySelector('#p1wins');
const p2name = document.querySelector('#p2name');
const p2symbol = document.querySelector('#p2symbol');
const p2wins = document.querySelector('#p2wins');

let players = [];

const display = function(){
    function scoreboard(){
        p1name.textContent = players[0].name;
        p1symbol.textContent = players[0].symbol;
        p1wins.textContent = players[0].wins;
        p2name.textContent = players[1].name;
        p2symbol.textContent = players[1].symbol;
        p2wins.textContent = players[1].wins;
}
    function header(initial,final,time){
        headerDisplay.textContent = initial;
        if(final === undefined) {return}
        let delay = 5000;
        if (time !== undefined) {delay = time * 1000}
        setTimeout(function(){
            headerDisplay.textContent = final
        },delay)
    }
return {scoreboard,header}
}()

const board = function(){
    let gameState = ['','','','','','','','','']
    const update = function (){
        while (boardElement.firstChild) {
            boardElement.removeChild(boardElement.lastChild);
          }
        for (let i = 0; i < gameState.length; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            if (gameState[i] !== '') {
                square.classList.add(`${gameState[i]}`)}
            square.setAttribute('data-index',`${i}`);
            square.setAttribute('data-xoxo',`${gameState[i]}`)

            boardElement.appendChild(square);
            square.addEventListener('click',game.playerTurn)
            
        }
        checkWinCondtion();
    }
    function addPlay (str,index){
        if (gameState[index] == 'nil') {
            return
        }
        gameState[index] = str;
        update();
        
    }
    function checkWinCondtion(){
            for (let i = 0; i < 3; i++){

                if ((gameState[0] == 'x' && gameState[0] === gameState[1] && gameState[1] === gameState[2])
                    || (gameState[3] == 'x' && gameState[3] === gameState[4] && gameState[4] === gameState[5])
                    || (gameState[6] == 'x' && gameState[6] === gameState[7] && gameState[7] === gameState[8])
                    || (gameState[0] == 'x' && gameState[0] === gameState[3] && gameState[3] === gameState[6])
                    || (gameState[1] == 'x' && gameState[1] === gameState[4] && gameState[4] === gameState[7])
                    || (gameState[2] == 'x' && gameState[2] === gameState[5] && gameState[5] === gameState[8])
                    || (gameState[2] == 'x' && gameState[2] === gameState[5] && gameState[5] === gameState[8])
                    || (gameState[0] == 'x' && gameState[0] === gameState[4] && gameState[4] === gameState[8])
                    || (gameState[2] == 'x' && gameState[2] === gameState[4] && gameState[4] === gameState[6])) {
                        gameState.forEach((str,ind) => {
                            if (str == '') {
                                gameState[ind] = 'nil'
                            }
                        })
                        return game.gameOver('x')
                    } else if ((gameState[0] == 'x' && gameState[0] === gameState[1] && gameState[1] === gameState[2])
                    || (gameState[3] == 'o' && gameState[3] === gameState[4] && gameState[4] === gameState[5])
                    || (gameState[6] == 'o' && gameState[6] === gameState[7] && gameState[7] === gameState[8])
                    || (gameState[0] == 'o' && gameState[0] === gameState[3] && gameState[3] === gameState[6])
                    || (gameState[1] == 'o' && gameState[1] === gameState[4] && gameState[4] === gameState[7])
                    || (gameState[2] == 'o' && gameState[2] === gameState[5] && gameState[5] === gameState[8])
                    || (gameState[2] == 'o' && gameState[2] === gameState[5] && gameState[5] === gameState[8])
                    || (gameState[0] == 'o' && gameState[0] === gameState[4] && gameState[4] === gameState[8])
                    || (gameState[2] == 'o' && gameState[2] === gameState[4] && gameState[4] === gameState[6])) {
                        gameState.forEach((str,ind) => {
                            if (str == '') {
                                gameState[ind] = 'nil'
                            }
                        })
                        return game.gameOver('o')
                    } else if (gameState.find(str=>str == '') == undefined) {
                        gameState.forEach((str,ind) => {
                            if (str == '') {
                                gameState[ind] = 'nil'
                            }
                        })
                        game.gameOver('tie')
                    }


                }
            }
    function reset(){
        gameState.forEach((ele,ind) => {gameState[ind]=''})
        update();
        
        
    }
    function log(){
        console.log(gameState);
    }
    return {update,addPlay,reset,log}
}()

const game = function(){
    let gameMode = 'pvp';
    let turn = ''; 
    const changeturn = function (){
        if (turn === players[1].name){turn = players[0].name } 
            else {turn = players[1].name}
    }
    const playerTurn = function() {
        if (this.dataset.xoxo !== '') {
            return
        } ;
        let tag = this.dataset.square;
        let index = this.dataset.index;
        let choice = '';
        if (gameMode == 'pvp'){
        if (turn == players[0].name) {
            choice = 'x'} else if (turn == players[1].name){
                choice = 'o'                
            }} 
        board.addPlay(choice,index)
        changeturn()
        }
    function changeGameMode(){
        if (this.textContent == 'vs Player'){
            p2input.classList.add('hide');
            p2input.value = '';   
            gameMode = 'pvc';
            this.textContent = 'vs Computer'
            return
            }
        if (this.textContent == 'vs Computer') {
            p2input.classList.remove('hide');
            gameMode = 'pvp'
            return this.textContent = 'vs Player'};
        }
    function gameOver(str){
        if (str == 'x'){
            display.header('Xs Win!');
            players.forEach((str,index)=>{
                if (str.symbol == 'x') {
                    players[index].wins++
                }
            })
        } else if (str == 'o') {
            display.header('Os Win!') ;
            players.forEach((str,index)=>{
                if (str.symbol == 'o') {
                    players[index].wins++
                }
            })
        } else if (str == 'tie') {
            display.header('It\'s a... tie?','Hit reset for another round',8);
        }
    
        display.scoreboard()
    }
    function startGame () {
        players.length = 0; 
        if (p1input.value == '') {
            return alert('Please enter player name')
        } else if ((p2input.classList.contains('hide') == false) && p2input.value == '') {
            return alert('Please enter player name')
        }
        if (gameMode == 'pvc') {
            p2input.value = 'TicTacToerminator'
        }
        popUp.classList.toggle('hide');
        
        const p1name = p1input.value;
        const p2name = p2input.value;
        newPlayer(p1name);
        if (p2input.value !== '') {
            newPlayer(p2name)
        }
        turn = players[0].name;
        const form = document.querySelector('#form').reset();
        display.scoreboard();
        board.reset();
    }
    function highlightTurn (){
        if (p1name == turn){
            p1name.classList.add('highlight');
            p2name.classList.remove('highlight');
        } else if (p2name == turn) {
            p2name.classList.add('highlight');
            p1name.classList.remove('highlight');
        }
    }
    return {playerTurn, startGame, changeGameMode, gameOver, highlightTurn}
}()

function newPlayer (name){
    if (players.length == 0){
    return players.push({name:name, wins:0, symbol:'x', player:1})} 
    else if (players.length == 1) {
        return players.push({name:name, wins:0, symbol:'o', player:2})
    }
}
function togglePopup() {
    popUp.classList.toggle('hide');
    players = []
}

    versusBtn.addEventListener('click',game.changeGameMode);
    startBtn.addEventListener('click', game.startGame);
    newGameBtn.addEventListener('click',togglePopup);
    resetBtn.addEventListener('click', board.reset);