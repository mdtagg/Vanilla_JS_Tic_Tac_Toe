

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

const winningComboArray = []

function checkBoard(board) {

    checkForRows(board)
    checkColumns(board)
    checkDiagonals(board)

    // if(checkForRows || checkForColumns || checkForDiagonals) {
    //     console.log('You Win')
    // }
}

let winningCombo = '1,1,1'
let losingCombo = '0,0,0'

function checkForRows(board) {
    let firstRow = [board[0],board[1],board[2]]
    let secondRow = [board[3],board[4],board[5]]
    let thirdRow = [board[6],board[7],board[8]]
    
    if(firstRow.toString() === winningCombo ||
    secondRow.toString() === winningCombo ||
    thirdRow.toString() === winningCombo ) {
        console.log('win')
        return 'win'
    } 

    else if(firstRow.toString() === losingCombo ||
    secondRow.toString() === losingCombo ||
    thirdRow.toString() === losingCombo ) {
        console.log('loss')
        return 'loss'
    }
}

function checkColumns(board) {
    let firstColumn = [board[0],board[3],board[6]]
    let secondColumn = [board[1],board[4],board[7]]
    let thirdColumn = [board[2],board[5],board[8]]

    if(firstColumn.toString() === winningCombo ||
    secondColumn.toString() === winningCombo ||
    thirdColumn.toString() === winningCombo) {
        console.log('win')
        return 'win'
    }

    else if(firstColumn.toString() === losingCombo ||
    secondColumn.toString() === losingCombo ||
    thirdColumn.toString() === losingCombo) {
        console.log('loss')
        return 'loss'
    }
}

function checkDiagonals(board) {
    let firstDiagonal = [board[0],board[4],board[8]]
    let secondDiagonal = [board[2],board[4],board[6]]

    if(firstDiagonal.toString() === winningCombo ||
    secondDiagonal.toString() === winningCombo) {
        console.log('win')
        return 'win'
    }
    else if(firstDiagonal.toString() === losingCombo ||
    secondDiagonal.toString() === losingCombo) {
        console.log('win')
        return 'win'
    }
}

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
    // console.log(board)
    checkBoard(board)
}


// const xWinningCombos = [
//     [1,1,1,0,0,0,0,0,0],
//     [0,0,0,1,1,1,0,0,0],
//     [0,0,0,0,0,0,1,1,1],
//     [1,0,0,1,0,0,1,0,0],
//     [0,1,0,0,1,0,0,1,0],
//     [0,0,1,0,0,1,0,0,1],
//     [1,0,0,0,1,0,0,0,1],
//     [0,0,1,0,1,0,1,0,0]
// ]

// const oWinningCombos = [
//     [0,0,0,1,1,1,1,1,1],
//     [1,1,1,0,0,0,1,1,1],
//     [1,1,1,1,1,1,0,0,0],
//     [0,1,1,0,1,1,0,1,1],
//     [1,0,1,1,0,1,1,0,1],
//     [1,1,0,1,1,0,1,1,0],
//     [0,1,1,1,0,1,1,1,0],
//     [1,1,0,1,0,1,0,1,1]
// ]

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