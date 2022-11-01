

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

    checkRows(board)
    checkColumns(board)
    checkDiagonals(board)
}

const modal = document.querySelector('.modal')
const modal_text = document.querySelector('.modal-text')

function winMessage() {
    modal.setAttribute('style','display:block;')
    modal_text.textContent = 'YOU WIN!'
}

function lossMessage() {
    modal.setAttribute('style','display:block;')
    modal_text.textContent = 'YOU LOSE!'
}

function tieMessage() {
    modal.setAttribute('style','display:block;')
    modal_text.textContent = 'ITS A DRAW!'
}

let winningCombo = '1,1,1'
let losingCombo = '0,0,0'



function checkRows(board) {
    let firstRow = [board[0],board[1],board[2]]
    let secondRow = [board[3],board[4],board[5]]
    let thirdRow = [board[6],board[7],board[8]]
    
    if(firstRow.toString() === winningCombo ||
    secondRow.toString() === winningCombo ||
    thirdRow.toString() === winningCombo ) {

        winMessage()
    } 

    else if(firstRow.toString() === losingCombo ||
    secondRow.toString() === losingCombo ||
    thirdRow.toString() === losingCombo ) {
        
        lossMessage()
    }

    else if(!board.includes('')) {
        tieMessage()
    }
}

function checkColumns(board) {
    let firstColumn = [board[0],board[3],board[6]]
    let secondColumn = [board[1],board[4],board[7]]
    let thirdColumn = [board[2],board[5],board[8]]

    if(firstColumn.toString() === winningCombo ||
    secondColumn.toString() === winningCombo ||
    thirdColumn.toString() === winningCombo) {
        
        winMessage()
    }

    else if(firstColumn.toString() === losingCombo ||
    secondColumn.toString() === losingCombo ||
    thirdColumn.toString() === losingCombo) {
        
        lossMessage()
    }
}

function checkDiagonals(board) {
    let firstDiagonal = [board[0],board[4],board[8]]
    let secondDiagonal = [board[2],board[4],board[6]]

    if(firstDiagonal.toString() === winningCombo ||
    secondDiagonal.toString() === winningCombo) {
        winMessage()
    }
    else if(firstDiagonal.toString() === losingCombo ||
    secondDiagonal.toString() === losingCombo) {
        
        lossMessage()
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
    checkBoard(board)
}

const restart = document.querySelector('.restart-button')
restart.addEventListener('click', restartGame)

function restartGame() {
    boxes.forEach(box => box.textContent = "")
    modal.setAttribute('style','display:none;')
    xTurn = true
    oTurn = false
}

// ai 

function aiChoice() {
    
}