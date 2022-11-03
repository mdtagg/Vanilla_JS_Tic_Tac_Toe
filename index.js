
const displayController = (() => {

    let noChoiceList = []
    const playerChoice = (e) => {

        if(e.target.textContent === 'X' || e.target.textContent === 'O') {
            return
        }
        else  {
            e.target.textContent = 'X'
            noChoiceList.push(parseInt(e.target.dataset.attribute))
            // checkForEndGame.checkRows()
        }
    }

    const aiChoice = () => {
        let randomNumber = Math.floor(Math.random() * 9)
        
        for(let i = 0;i < noChoiceList.length;i++) {
    
            if(noChoiceList.includes(randomNumber) && noChoiceList.length >= 9) {
                // checkForEndGame()
                return
            }
            else if(noChoiceList.includes(randomNumber)) {
                aiChoice()
                return 
            }
            else {
                noChoiceList.push(randomNumber)
                gameFlow.setAiChoice(randomNumber)
                // checkForEndGame()
                return
            }
        }
    }
    
    return { playerChoice,aiChoice }

})()

const gameFlow = (() => {
    const boxes = document.querySelectorAll('.box')
    boxes.forEach(box => 
        {
        box.addEventListener('click', displayController.playerChoice),
        box.addEventListener('click', displayController.aiChoice)
    })
   
    const setAiChoice = (randomNumber) => {
        boxes[randomNumber].textContent = 'O'
        checkForEndGame.checkRows()
        return
    }

    const createBoard = () => {

        const board = []
        
        for(let i = 0;i < boxes.length;i++) {
            if(boxes[i].textContent === 'X') {
                board.push('1')
            }
            else if(boxes[i].textContent === 'O') {
                board.push('0')
            }
            else{
                board.push('')
            }
        }
        console.log(board)
        return board 
        // checkBoard(board)
    }

    return { setAiChoice,createBoard }
})()

const checkForEndGame = (() => {
    
    let winningCombo = '1,1,1'
    let losingCombo = '0,0,0'
    
    const checkRows = () => {
        // console.log(board)
        const boardMarks = gameFlow.createBoard()
        let rowOne = boardMarks.slice(0,3)
        let rowTwo = boardMarks.slice(3,6)
        let rowThree = boardMarks.slice(6,9)
        console.log(rowOne)
    }
    return { checkRows }

})()

// checkForEndGame()
// const winningComboArray = []

// function checkBoard(board) {

//     checkRows(board)
//     checkColumns(board)
//     checkDiagonals(board)
// }

function checkRows(board) {
    let firstRow = [board[0],board[1],board[2]]
    let secondRow = [board[3],board[4],board[5]]
    let thirdRow = [board[6],board[7],board[8]]
    
    if(firstRow.toString() === winningCombo ||
    secondRow.toString() === winningCombo ||
    thirdRow.toString() === winningCombo ) {

        // winMessage()
        endMessageCreator().createEndMessage('YOU WIN!')
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
        
        // winMessage()
        endMessageCreator.createEndMessage('YOU WIN!')
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
        // winMessage()
        endMessageCreator('YOU WIN!').createEndMessage()
    }
    else if(firstDiagonal.toString() === losingCombo ||
    secondDiagonal.toString() === losingCombo) {
        
        lossMessage()
    }
}

const endMessageCreator = () => {

    const modal = document.querySelector('.modal')
    const modal_text = document.querySelector('.modal-text')
    

    const createEndMessage = (message) => {
        modal.setAttribute('style','display:block;')
        modal_text.textContent = message
    }

    const restartGame = () => {
        boxes.forEach(box => box.textContent = "")
        modal.setAttribute('style','display:none;')
        xTurn = true
        noChoiceList = []
    }

    return { createEndMessage, restartGame}

}

const modalObject = (() => {
     
    const modal = document.querySelector('.modal')
    const restart = document.querySelector('.restart-button')

    const restartGame = () => {
        boxes.forEach(box => box.textContent = "")
        modal.setAttribute('style','display:none;')
        xTurn = true
        noChoiceList = []
    }
    
    restart.addEventListener('click', restartGame)

})()


// GOOD OBJECT

// const endMessageCreator = (message) => {
    // const modal = document.querySelector('.modal')
    // const modal_text = document.querySelector('.modal-text')

//     const createMessage = () => {
//         modal.setAttribute('style','display:block;')
//         modal_text.textContent = message
//     }
//     return { createMessage }
// }


//     function restartGame() {
//         boxes.forEach(box => box.textContent = "")
//         modal.setAttribute('style','display:none;')
//         xTurn = true
//         noChoiceList = []
//     }
// }
// )


// for(let i = 0;i < 9;i++) {
    //     const box = document.createElement('div')
    //     box.classList.add('box')
    //     box.setAttribute('data-attribute',`${i}`)
    //     if(i < 2 || i >= 3 && i < 5) {
    //         box.classList.add('cornerBorder')
    //     }
    //     else if (i === 2 || i === 5) {
    //         box.classList.add('bottomBorder')
    //     }
    //     else if (i < 8) {
    //         box.classList.add('borderRight')
    //     }
    //     container.appendChild(box)
    // }

//flipping turns

// const boxes = document.querySelectorAll('.box')
// boxes.forEach(box => box.addEventListener('click', playerChoice))

// function playerChoice(e) {
//     if(e.target.textContent === 'X' || e.target.textContent === 'O') {
//         return
//     }
//     else  {
//         e.target.textContent = 'X'
//         noChoiceList.push(parseInt(e.target.dataset.attribute))
//         createGameBoard.aiChoice()
//         // aiChoice()
//     }
//     checkForWins()
// }

// ai 

// let noChoiceList = []

// function aiChoice() {
//     let randomNumber = Math.floor(Math.random() * 9)
    
//     for(let i = 0;i < noChoiceList.length;i++) {

//         if(noChoiceList.includes(randomNumber) && noChoiceList.length === 9) {
//             checkForWins()
//         }
//         else if(noChoiceList.includes(randomNumber)) {
//             aiChoice()
//             return 
//         }
//         else {
//             console.log(noChoiceList)
//             console.log(randomNumber)
//             boxes[randomNumber].textContent = 'O'
//             noChoiceList.push(randomNumber)
//             return
//         }
//     }
// }

// function checkForWins() {
//     let board = []
//     for(let i = 0;i < boxes.length;i++) {
//         if(boxes[i].textContent === 'X') {
//             board.push(1)
//         }
//         else if(boxes[i].textContent === 'O') {
//             board.push(0)
//         }
//         else{
//             board.push('')
//         }
        
//     }
//     checkBoard(board)
// }