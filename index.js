
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

    const start_button = document.querySelector('.start-button')
    const start_page = document.querySelector('.start-page')
    const game_page = document.querySelector('.gamePage')
    const modal = document.querySelector('.modal')
    const modal_text = document.querySelector('.modal-text')
    const restart = document.querySelector('.restart-button')

    const score_player_one = document.querySelector('.player-one')
    const input_player_one = document.getElementById('playerOne')
    const score_player_two = document.querySelector('.player-two')
    const input_player_two = document.getElementById('playerTwo')
    const computer = document.getElementById('computer')
    
    const createEndMessage = (message) => {
        modal.setAttribute('style','display:block;')
        modal_text.textContent = message
    }

    const restartGame = () => {
        gameFlow.boxes.forEach(box => box.textContent = "")
        modal.setAttribute('style','display:none;')
        displayController.resetChoiceList() 
    }

    const startGame = () => {
        start_page.setAttribute('style','display:none;')
        game_page.setAttribute('style','display:grid; grid-template-columns:1fr 1fr 1fr;')
    }

    const getPlayers = () => {
        if(computer.checked && input_player_two.value !== "") {
            alert("Play against another player or the computer")
            game_page.setAttribute('style','display:none;')
            start_page.setAttribute('style','display:flex; flex-direction:column;')
        }
        else if(computer.checked) {
            score_player_two.textContent = 'Computer'
        }else if(!computer.checked){
            score_player_one.textContent = input_player_one.value
            score_player_two.textContent = input_player_two.value
        }
    }

    restart.addEventListener('click', restartGame)
    start_button.addEventListener('click', startGame)
    start_button.addEventListener('click', getPlayers)
    return { createEndMessage, restartGame}
})()

