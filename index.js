

const createGameBoard = (() => {

    const container = document.querySelector('.container')

    for(let i = 1;i < 10;i++) {
        const box = document.createElement('div')
        box.classList.add('box')
        box.setAttribute('data-attribute',`${i}`)
        if(i < 3 || i >= 4 && i < 6) {
            box.classList.add('cornerBorder')
        }
        else if (i === 3 || i === 6) {
            box.classList.add('bottomBorder')
        }
        else if (i < 9) {
            box.classList.add('borderRight')
        }
        container.appendChild(box)
    }
})()
 
const gameBoard = (() => {

    let gameField = new Array(9)

})()

const displayController = (() => {


})()

const playerFactory = (sign) => {


}

//flipping turns

let xTurn = true
let oTurn = false

const boxes = document.querySelectorAll('.box')
boxes.forEach(box => box.addEventListener('click', (e) => {

    if(e.target.textContent === 'X' || e.target.textContent === 'O') {
        return
    }

    else if(xTurn === true) {
        e.target.textContent = 'X'
        xTurn = false
        oTurn = true
    }
    
    else {
        e.target.textContent = 'O'
        oTurn = false
        xTurn = true
    }
    checkForWins()
}))

//checking for wins loss draw

// const winningComboArray = []

function checkBoard(board) {

    checkForRows(board)
    checkForColumns(board)
    checkForDiagonals(board)

    if(checkForRows || checkForColumns || checkForDiagonals) {
        console.log('You Win')
    }
}

function checkForRows(board) {
    
}


const xWinningCombos = [
    [1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,1],
    [1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0],
    [0,0,1,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,0,1],
    [0,0,1,0,1,0,1,0,0]
]

const oWinningCombos = [
    [0,0,0,1,1,1,1,1,1],
    [1,1,1,0,0,0,1,1,1],
    [1,1,1,1,1,1,0,0,0],
    [0,1,1,0,1,1,0,1,1],
    [1,0,1,1,0,1,1,0,1],
    [1,1,0,1,1,0,1,1,0],
    [0,1,1,1,0,1,1,1,0],
    [1,1,0,1,0,1,0,1,1]
]

function checkForWins() {
    let board = []
    for(let i = 0;i < boxes.length;i++) {
        if(boxes[i].textContent === 'X') {
            board.push(1)
        }
        else if(boxes[i].textContent === 'O') {
            board.push(0)
        }
        else{
            board.push('')
        }
        
    }
    console.log(board)
    checkBoard(board)
}

// function checkBoard(board) {
    
// }

    

// function gameState() {

//     const boxes = document.querySelectorAll('.box')
//     boxes.forEach(box => box.addEventListener('click', markBox))
//     return {boxes}
// }


// function markBox(e) {

    
//     if(e.target.classList.contains('x-mark')) {
//         e.target.textContent = 'O'
//         e.target.classList.add('y-mark')
//     }

//     else {
//         e.target.textContent = 'X'
//         e.target.classList.add('x-mark')
//     }
    
// }