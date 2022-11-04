
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
    }
    restart.addEventListener('click', restartGame)
    return { createEndMessage, restartGame}
})()

