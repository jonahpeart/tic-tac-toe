(()=>{
    function createPlayer(name, symbol){
        return{
            name,
            symbol
        }
    }
    
    const Game = (()=>{
        let gameBoardArray = Array(9).fill(null);
        let players = []
        let currentPlayer
        const modal = document.querySelector("#myModal")
        const playAgain = document.querySelector("#play-again")
            const start = () => {
                players = [
                    createPlayer(document.querySelector(".x-input").value, "X"),
                    createPlayer(document.querySelector(".o-input").value, "O")
                ]
                currentPlayer = 0
                gameBoard.renderDisplay()
            }
            const click = (event) => {
                if (event.target.innerHTML == "") {
                    event.target.insertAdjacentHTML("afterbegin", players[currentPlayer].symbol)
                    currentPlayer = currentPlayer === 0 ? 1 : 0;
                    gameBoardArray[event.target.classList[1]] = currentPlayer
                    checkWin()
                }
            }
            const checkTie = () => {
                if (!gameBoardArray.includes(null)) {
                    modal.style.display = "block";
                    modal.children[0].children[0].innerHTML = `Tie!`
                    gameBoardArray = Array(9).fill(null);
                    playAgain.addEventListener("click", (e) => {gameBoard.restartRender(modal)})  
                } return
            }
            const win = () => {
                let winningPlayer = currentPlayer === 0 ? 1 : 0;
                modal.style.display = "block";
                modal.children[0].children[0].innerHTML = `${players[winningPlayer].name} wins!`
                gameBoardArray = Array(9).fill(null);
                playAgain.addEventListener("click", (e) => {gameBoard.restartRender(modal)})
    
            }
            const checkWin = () => {
                const allEqual = arr => arr.every(val => val === arr[0]);
                let i = 0;
                for (let row = 0; row < 3; row++) {
                    let rows = gameBoardArray.slice(i, i + 3)
                    i = i + 3;
                        if (!rows.includes(null) && allEqual(rows)) { win(); break; }
                }
                for (let col = 0; col < 3; col++) {
                    let cols = [gameBoardArray[col], gameBoardArray[col + 3], gameBoardArray[col + 6]]
                    if (!cols.includes(null) && allEqual(cols)) { win(); break; }
                }
                let diagOne = [gameBoardArray[0], gameBoardArray[4], gameBoardArray[8]]
                let diagTwo = [gameBoardArray[2], gameBoardArray[4], gameBoardArray[6]]
                if (!diagOne.includes(null) && allEqual(diagOne)) { win(); }
                if (!diagTwo.includes(null) && allEqual(diagTwo)) { win(); }
                checkTie()
            }
            return {
                start,
                click
                }
            
    })();
    
    const gameBoard = (()=>{
        const squares = document.querySelectorAll(".area")
        const renderDisplay = () => {
                squares.forEach(item => {
                    item.addEventListener("click", Game.click)})
                }
    
        const restartRender = (modal) => {
            modal.style.display = "none"
            squares.forEach(item => {
                item.innerHTML = ""
            })
        }
        return {renderDisplay,
            restartRender
        }
    })();
    
    document.getElementById('submit').addEventListener("click", function (e) {
        e.preventDefault();
        if (document.querySelector(".x-input").value != "")
        {Game.start()} else alert("enter names")
    })
     
})()









// EARLY SCRIPT, JUST KEPT IT HERE FOR FUTURE REFERENCE

// (() => {
    
//      const newGame = () => {    
//         document.getElementById('submit').addEventListener("click", function (e) {
//             e.preventDefault();
//             let gameBoard = Array(9).fill(null);
//             document.querySelector(".x-input").value = ""
//             document.querySelector(".o-input").value = ""

//             const squares = document.querySelectorAll(".area")
//             let player1 = Game(document.querySelector(".x-input").value, 1, squares, gameBoard);
//             let player2 = Game(document.querySelector(".o-input").value, 2, squares, gameBoard);

//             let player = 1
//             squares.forEach(item => {
//                 item.addEventListener("click", () => {
//                     if (player == 1) {
//                         player1.updateBoard(item.classList[1])
//                         player = 2
//                     } else if (player == 2) {
//                         player2.updateBoard(item.classList[1])
//                         player = 1
//                     }
//                 })
//             })
//         })
//     }
//     newGame()
    


//     function Game(name, symbol,squares,gameBoard) {
//         return {
//             name,
//             symbol,
//             squares,
//             gameBoard,
//             modal: modal = document.querySelector("#myModal"),
//             playAgain: playAgain = document.querySelector("#play-again"),
//             updateBoard: function (i) {
//                 if (!gameBoard[i]) {
//                     gameBoard[i] = Number(symbol)
//                     this.checkWin(squares)
//                     this.checkTie()
//                 }
//             },
//             win() {
//                 console.log(gameBoard)
//                 modal.children[0].children[0].innerHTML = `${name} Wins!`
//                 this.modal.style.display = "block";
//                 this.newGame(gameBoard)
//             },
//             checkWin: function (squares) {
//                 let i = 0;
//                 for (let row = 0; row < 3; row++) {
//                     let rows = gameBoard.slice(i, i + 3)
//                     i = i + 3;
//                     if (!!rows.reduce(function (a, b) { return (a === b) ? a : NaN; })) { this.win(gameBoard); break; }
//                 }
//                 for (let col = 0; col < 3; col++) {
//                     let cols = [gameBoard[col], gameBoard[col + 3], gameBoard[col + 6]]
//                     if (!!cols.reduce(function (a, b) { return (a === b) ? a : NaN; })) { this.win(gameBoard); break; }
//                 }
//                 let diagOne = [gameBoard[0], gameBoard[4], gameBoard[8]]
//                 let diagTwo = [gameBoard[2], gameBoard[4], gameBoard[6]]

//                 if (!!diagOne.reduce(function (a, b) { return (a === b) ? a : NaN; })) { this.win(gameBoard); }
//                 if (!!diagTwo.reduce(function (a, b) { return (a === b) ? a : NaN; })) { this.win(gameBoard); }
//                 this.renderDisplay(squares, gameBoard)
//             },
//             checkTie: function () {
//                 console.log(gameBoard)
//                 if (!gameBoard.includes(null)) {
//                     this.newGame()
//                 }
//             },
//             renderDisplay: function (squares) {
//                 squares.forEach(item => {
//                     item.innerHTML = ""
//                 })
//                 squares.forEach(item => {
//                     if (gameBoard[item.classList[1]] == 1) {
//                         item.insertAdjacentHTML("afterbegin", "X")
//                     } else if (gameBoard[item.classList[1]] == 2) {
//                         item.insertAdjacentHTML("afterbegin", "O")
//                     } else if (gameBoard[item.classList[1]]) {
//                         item.insertAdjacentHTML("afterbegin", "")
//                     }
//                 })
//             },
//             newGame: function() {
//                 playAgain.addEventListener("click", ()=>{
//                     this.modal.style.display = "none"

//                     newGame()
//                 })
//             }
//         }
//     }
// })();