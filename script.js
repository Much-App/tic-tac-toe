

const boardElement = document.querySelector('#board');


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
        gameState[index] = str;
        board.update();
        
    }
        function checkWinCondtion(){
            for (let i = 0; i < 3; i++){
                if ((gameState[i] !== '' && gameState[i] === gameState[i+1] && gameState[i+1] === gameState[i+2])
                    || (gameState[i] !== '' && gameState[i] === gameState[i+3] && gameState[i+3] === gameState[i+6])
                    || (gameState[0] !== '' && gameState[0] === gameState[4] && gameState[4] === gameState[8])
                    || (gameState[2] !== '' && gameState[2] === gameState[4] && gameState[4] === gameState[6])) {
                    gameOver
                    return console.log('last player wins')
                }
            }
            if (gameState.find(str=>str == '') == undefined) {
                /* game ends */return alert('Tie')
            }
        }
    return {update,addPlay,gameState}
}()

const game = function(){
    let turn = true; /* true = X turn, false = O turn */
    const changeturn = function (){
        if (turn === false){turn = true } 
            else {turn = false}
    }
    const playerTurn = function() {
        if (this.dataset.xoxo !== '') {
            return
        } ;
        let tag = this.dataset.square;
        let index = this.dataset.index;
        let choice = '';
        if (turn === true) {
            choice = 'x'
            changeturn()} else if (turn === false){
                choice = 'o';
                changeturn()
            }
        board.addPlay(choice,index)
        
        }
    
    return {playerTurn}
}()
const players = [];

function newPlayer (name){
    players.push({name, wins:0, gamesPlayed:0, streak:0});
}

board.update()