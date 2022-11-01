

const createGameBoard = (() => {

    const container = document.querySelector('.container')

    for(let i = 0;i < 9;i++) {
        const box = document.createElement('div')
        box.classList.add('box')
        box.setAttribute('data-attribute',`${i}`)
        if(i < 2 || i >= 3 && i < 5) {
            box.classList.add('cornerBorder')
        }
        else if (i === 2 || i === 5) {
            box.classList.add('bottomBorder')
        }
        else if (i < 8) {
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

const boxes = document.querySelectorAll('.box')
boxes.forEach(box => box.addEventListener('click', (e) => {

    if(e.target.textContent === 'X' || e.target.textContent === 'O') {
        return
    }

    else  {
        e.target.textContent = 'X'
        noChoiceList.push(parseInt(e.target.dataset.attribute))
        aiChoice()
    }

    checkForWins()
}))

// ai 

let noChoiceList = []

function aiChoice() {
    let randomNumber = Math.floor(Math.random() * 9)
    
    for(let i = 0;i < noChoiceList.length;i++) {

        if(noChoiceList.includes(randomNumber) && noChoiceList.length === 9) {
            checkForWins()
        }
        else if(noChoiceList.includes(randomNumber)) {
            aiChoice()
            return 
        }
        else {
            console.log(noChoiceList)
            console.log(randomNumber)
            boxes[randomNumber].textContent = 'O'
            noChoiceList.push(randomNumber)
            return
        }
    }
}

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
    noChoiceList = []
}

