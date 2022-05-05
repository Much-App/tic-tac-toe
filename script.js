

const boardElement = document.querySelector('#board');



const gameboard = function(){
    let gameState = {a1:'x', a2:'o',a3:'x',b1:'x',b2:'o',b3:'x',c1:'o',c2:'x',c3:'o'};
    const updateBoard = function (){
        for (const key in gameState) {
            let square = document.createElement('div');
            square.setAttribute('data-square',`${key}`);
            square.classList.add('square');
            square.textContent = `${gameState[key]}`;
            boardElement.appendChild(square);
        }
        
    }
    return {updateBoard}
}()
const players = [];
function newPlayer (name){
    return {name, wins:0, gamesPlayed:0, streak:0}
}

