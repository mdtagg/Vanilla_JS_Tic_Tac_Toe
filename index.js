
const displayController = (() => {

    let noChoiceList = []
    const playerChoice = (e) => {

        if(e.target.textContent === 'X' || e.target.textContent === 'O') {
            return
        }
        else if(noChoiceList.length < 9) {
            e.target.textContent = 'X'
            noChoiceList.push(parseInt(e.target.dataset.attribute))
            return
            // console.log(noChoiceList)
        }
        else if(noChoiceList.length >= 9){
            let noChoiceListLength = noChoiceList.length
            checkForEndGame.checkWins(noChoiceListLength)
            noChoiceList = []
            return
        }
    }

    const aiChoice = () => {
        let randomNumber = Math.floor(Math.random() * 9)
        
        for(let i = 0;i < noChoiceList.length;i++) {
    
            if(noChoiceList.includes(randomNumber) && noChoiceList.length < 9) {
                aiChoice()
                return 
            }
            else {
                noChoiceList.push(randomNumber)
                gameFlow.setAiChoice(randomNumber)
                return
            }
        }
    }
    
    const resetChoiceList = () => {
        console.log(noChoiceList)
        noChoiceList = []
    }
    
    return { playerChoice,aiChoice,resetChoiceList }

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
        checkForEndGame.checkWins()
        return
    }

    const createBoard = () => {

        const board = []
        for(let i = 0;i < boxes.length;i++) {
            if(boxes[i].textContent === 'X') {
                board.push(1)
            }else if(boxes[i].textContent === 'O') {
                board.push(0)}
             else{board.push('')}
        }
        return board 
    }

    return { setAiChoice,createBoard,boxes }
})()

const checkForEndGame = (() => {
    
    let winningCombo = '1,1,1'
    let losingCombo = '0,0,0'
    
    const checkWins = (noChoiceListLength) => {
        const boardMarks = gameFlow.createBoard()
            
        let rowOne = boardMarks.slice(0,3).toString()
        let rowTwo = boardMarks.slice(3,6).toString()
        let rowThree = boardMarks.slice(6,9).toString()

        let columnOne = [boardMarks[0],boardMarks[3],boardMarks[6]].toString()
        let columnTwo = [boardMarks[1],boardMarks[4],boardMarks[7]].toString()
        let columnThree = [boardMarks[2],boardMarks[5],boardMarks[8]].toString()

        let diagonalOne = [boardMarks[0],boardMarks[4],boardMarks[8]].toString()
        let diagonalTwo = [boardMarks[2],boardMarks[4],boardMarks[6]].toString()
        
        let testArray = [rowOne,rowTwo,rowThree,columnOne,columnTwo,columnThree,
        diagonalOne,diagonalTwo]
        console.log(testArray)

        for(let i = 0;i < 9;i++) {
            if(testArray[i] === winningCombo) {
                endMessageCreator.createEndMessage('YOU WIN!')
            }else if(testArray[i] === losingCombo) {
                endMessageCreator.createEndMessage('YOU LOSE!')
            }else if(noChoiceListLength) {
                endMessageCreator.createEndMessage('ITS A DRAW!')
            }
        }
    }

    return { checkWins }

})()

const endMessageCreator = (() => {

    const modal = document.querySelector('.modal')
    const modal_text = document.querySelector('.modal-text')
    const restart = document.querySelector('.restart-button')
    
    const createEndMessage = (message) => {
        modal.setAttribute('style','display:block;')
        modal_text.textContent = message
    }

    const restartGame = () => {
        gameFlow.boxes.forEach(box => box.textContent = "")
        modal.setAttribute('style','display:none;')
        displayController.resetChoiceList()
        // xTurn = true
        
    }

    restart.addEventListener('click', restartGame)

    return { createEndMessage, restartGame}

})()

// const restart = (() => {
     
    // const restart = document.querySelector('.restart-button')

//     const restartGame = () => {
//         boxes.forEach(box => box.textContent = "")
//         modal.setAttribute('style','display:none;')
//         xTurn = true
//         noChoiceList = []
//     }
    
//     restart.addEventListener('click', restartGame)

// })()

// checkForEndGame()
// const winningComboArray = []

// function checkBoard(board) {

//     checkRows(board)
//     checkColumns(board)
//     checkDiagonals(board)
// }

// function checkRows(board) {
//     let firstRow = [board[0],board[1],board[2]]
//     let secondRow = [board[3],board[4],board[5]]
//     let thirdRow = [board[6],board[7],board[8]]
    
//     if(firstRow.toString() === winningCombo ||
//     secondRow.toString() === winningCombo ||
//     thirdRow.toString() === winningCombo ) {

//         // winMessage()
//         endMessageCreator().createEndMessage('YOU WIN!')
//     } 

//     else if(firstRow.toString() === losingCombo ||
//     secondRow.toString() === losingCombo ||
//     thirdRow.toString() === losingCombo ) {
        
//         lossMessage()
//     }

//     else if(!board.includes('')) {
//         tieMessage()
//     }
// }

// function checkColumns(board) {
//     let firstColumn = [board[0],board[3],board[6]]
//     let secondColumn = [board[1],board[4],board[7]]
//     let thirdColumn = [board[2],board[5],board[8]]

//     if(firstColumn.toString() === winningCombo ||
//     secondColumn.toString() === winningCombo ||
//     thirdColumn.toString() === winningCombo) {
        
//         // winMessage()
//         endMessageCreator.createEndMessage('YOU WIN!')
//     }

//     else if(firstColumn.toString() === losingCombo ||
//     secondColumn.toString() === losingCombo ||
//     thirdColumn.toString() === losingCombo) {
        
//         lossMessage()
//     }
// }

// function checkDiagonals(board) {
//     let firstDiagonal = [board[0],board[4],board[8]]
//     let secondDiagonal = [board[2],board[4],board[6]]

//     if(firstDiagonal.toString() === winningCombo ||
//     secondDiagonal.toString() === winningCombo) {
//         // winMessage()
//         endMessageCreator('YOU WIN!').createEndMessage()
//     }
//     else if(firstDiagonal.toString() === losingCombo ||
//     secondDiagonal.toString() === losingCombo) {
        
//         lossMessage()
//     }
// }


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