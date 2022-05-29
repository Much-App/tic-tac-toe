

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
    const update = function (arr){
        while (boardElement.firstChild) {
            boardElement.removeChild(boardElement.lastChild);
          }
        for (let i = 0; i < arr.length; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            if (arr[i] !== '') {
                square.classList.add(`${arr[i]}`)}
            square.setAttribute('data-index',`${i}`);
            square.setAttribute('data-xoxo',`${arr[i]}`)

            boardElement.appendChild(square);
            square.addEventListener('click',game.playerDecision)
            
        }
        board.highlightTurn();

    }
    const highlightTurn = function (str){
        if (str == 'p1'){
            p1name.classList.add('highlight');
            p2name.classList.remove('highlight');
        } else if (str == 'p2') {
            p2name.classList.add('highlight');
            p1name.classList.remove('highlight');
        }
    }
    const changeModeBtn = function(){
        if (this.textContent == 'vs Player'){
            p2input.classList.add('hide');
            p2input.value = '';   
            this.textContent = 'vs Computer'
            return
            }
        if (this.textContent == 'vs Computer') {
            p2input.classList.remove('hide');
            return this.textContent = 'vs Player'};
    }
    return {update, highlightTurn, changeModeBtn}
}()

const game = function(){
    let gameState = ['','','','','','','','',''];
    let mode = 'pvp';
    let currentTurn = '';
    const changeTurn = function (){
        if (currentTurn === 'p1'){currentTurn = 'p2' } 
            else {currentTurn = 'p1'}
    }
    const playerDecision = function() {
        if (this.dataset.xoxo !== '') {
            return
        }
        let index = this.dataset.index;
        let choice = '';
        if (mode == 'vs Player'){
            if (currentTurn == 'p1') {
                choice = 'x'
            } else if (currentTurn == 'p2'){
                    choice = 'o'            
            }}
        changeTurn()

        if (gameState[index] == 'nil') {
            return
        }
        gameState[index] = choice;
        board.update(gameState);    
        board.highlightTurn(currentTurn);
        checkWinCondtion();
    }
    const gameOver = function(str){
        if (str == 'x'){
            display.header('Xs Win!','Press Reset for new round',3);
            players.forEach((str,index)=>{
                if (str.symbol == 'x') {
                    players[index].wins++
                }
            })
        } else if (str == 'o') {
            display.header('Os Win!','Press Reset for new round',3) ;
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
    const startGame =function () {
        players.length = 0; 
        reset();
        if (p1input.value == '') {
            return alert('Please enter player 1 name')
        } 
        if ((p2input.classList.contains('hide') == false) && p2input.value == '') {
            return alert('Please enter player 2 name')
        }
        if (p1input.value == p2input.value) {
            if (confirm("Use same name for both players?") == false) {
                return}
        }
        
        popUp.classList.toggle('hide');

        const p1name = p1input.value;
        const p2name = p2input.value;
        newPlayer(p1name);
        if (p2input.value !== '') {
            newPlayer(p2name)
        }
        game.settings('p1',versusBtn.textContent)
        display.scoreboard();
        const form = document.querySelector('#form').reset();
    }
    const settings = function (t,m,state){
        currentTurn = t;
        mode = m;
        if (state == 'reset'){
            gameState = ['','','','','','','','',''];
        }
    }
    function reset(){
        gameState = ['','','','','','','','',''];
        display.header('New Round','Good Luck!',1.2)
        board.update(gameState);
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
                    gameState.forEach((str,ind) => {gameState[ind] = 'nil'})
                    return gameOver('x')
                } else if ((gameState[0] == 'x' && gameState[0] === gameState[1] && gameState[1] === gameState[2])
                || (gameState[3] == 'o' && gameState[3] === gameState[4] && gameState[4] === gameState[5])
                || (gameState[6] == 'o' && gameState[6] === gameState[7] && gameState[7] === gameState[8])
                || (gameState[0] == 'o' && gameState[0] === gameState[3] && gameState[3] === gameState[6])
                || (gameState[1] == 'o' && gameState[1] === gameState[4] && gameState[4] === gameState[7])
                || (gameState[2] == 'o' && gameState[2] === gameState[5] && gameState[5] === gameState[8])
                || (gameState[2] == 'o' && gameState[2] === gameState[5] && gameState[5] === gameState[8])
                || (gameState[0] == 'o' && gameState[0] === gameState[4] && gameState[4] === gameState[8])
                || (gameState[2] == 'o' && gameState[2] === gameState[4] && gameState[4] === gameState[6])) {
                    
                    gameState.forEach((str,ind) => {gameState[ind] = 'nil'})
                    return gameOver('o')
                } else if (gameState.find(str=>str == '') == undefined) {
                    gameState.forEach((str,ind) => {gameState[ind] = 'nil'})
                    return gameOver('tie')
                }


            }
    }
    return {playerDecision, startGame, settings, gameOver, reset}
}()

function newPlayer (name){
    if (players.length == 0){
    return players.push({name:name, wins:0, symbol:'x', player:1})} 
    else if (players.length == 1) {
        return players.push({name:name, wins:0, symbol:'o', player:2})
    }
}
function toggleNewGame() {
    popUp.classList.toggle('hide');
    players = []
}

    versusBtn.addEventListener('click',board.changeModeBtn);
    startBtn.addEventListener('click', game.startGame);
    newGameBtn.addEventListener('click',toggleNewGame);
    resetBtn.addEventListener('click', game.reset);

    /* while testing */
    p1input.value = 'p1';
    p2input.value = 'p2';
    game.startGame();
    /**/

    /*
    position = board state
    depth = how far the algorithm will analyze
    maximizingPlayer = whose decision is it (boolean value) 
    alpha = stores highest value for pruning
    beta = stores value for pruning */

    /* this should run only if there is one possible move
function staticEval (pos,maxiPlayer){

    let choice =''
    if(maxiPlayer == true){
        choice='x' 
    } else {choice ='0'}
    let virtualBoard = gameState;
    virtualBoard.forEach((ele,ind,arr)=>{
        if (ele == ''){
            arr[ind] = choice;
        }
    }

}

*/
