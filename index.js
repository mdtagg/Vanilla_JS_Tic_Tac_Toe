

const startPageObject = (() => {
    
    const start_page = document.querySelector('.startPage')
    const game_page = document.querySelector('.gamePage')
    const start_button = document.querySelector('.startButton')
    const playerOneInput = document.getElementById('playerOne')
    const playerTwoInput = document.getElementById('playerTwo')
    const playerOneScoreboard = document.querySelector('.playerOneTitle')
    const playerTwoScoreBoard = document.querySelector('.playerTwoTitle')
    const computerCheck = document.getElementById('computer')

    const startGame = () => {

        if(computerCheck.checked && playerTwoInput.value !== "") {
            alert('Please choose between playing against another person or the computer')
            return
        }else {
            start_page.setAttribute('style','display:none;')
            game_page.setAttribute('style','display:grid; grid-template-columns:1fr 1fr 1fr;')
            createPlayers()
        }
    }

    const createPlayers = () => {

        const playerOneValue = playerOneInput.value
        let playerTwoValue
        let againstComputer

        if(computerCheck.checked) {
            playerTwoValue = 'Computer'
            againstComputer = true
        }else {
            playerTwoValue = playerTwoInput.value
            againstComputer = false
        }
        
        const playerOne = createPlayer(playerOneValue)
        const playerTwo = createPlayer(playerTwoValue)

        playerOneScoreboard.textContent = playerOne.name
        playerTwoScoreBoard.textContent = playerTwo.name

        gamePageObject.getPlayers(playerOne,playerTwo,againstComputer)
    }

    const createPlayer = (name,score=0) => {
        this.name = name;
        this.score = score;
        return { name,score }
    }

    const toMenu = () => {

        game_page.setAttribute('style', 'display:none;')
        start_page.setAttribute('style', 'display:flex;')
    }

    start_button.addEventListener('click', startGame)

    return { startGame,createPlayers,toMenu }
})()



const gamePageObject = (() => {

    const boxes = document.querySelectorAll('.box')
    let noChoiceList = []
    let playerOneObject
    let playerTwoObject
    let againstComputerBool
    const playerOneScore = document.querySelector('.playerOneScore')
    const playerTwoScore = document.querySelector('.playerTwoScore')
    let xTurn = true;
    
    const getPlayers = (playerOne,playerTwo,againstComputer) => {
        playerOneObject = playerOne;
        playerTwoObject = playerTwo;
        againstComputerBool = againstComputer
    }

    const markBox = (e) => {
        
        if(e.target.textContent === 'X' || e.target.textContent === 'O') {
            return
        }else if(!againstComputerBool) {
            if(xTurn) {
                e.target.textContent = 'X'
                xTurn = false
                checkForEndGame()
            }else {
                xTurn = true
                e.target.textContent = 'O'
                checkForEndGame()
            }
            noChoiceList.push(parseInt(e.target.dataset.attribute))
        }else if(againstComputerBool) {
            e.target.textContent = 'X'
            noChoiceList.push(parseInt(e.target.dataset.attribute))
            let noChoiceListLength = noChoiceList.length
            if(noChoiceListLength === 9) {
                checkForEndGame(noChoiceListLength)
            }else {
                aiChoice()
            }
        }
    }

    const aiChoice = () => {
        
        const randomNumber = Math.floor(Math.random() * 9)

        if(noChoiceList.includes(randomNumber)) {
            aiChoice()
        }else {
            boxes[randomNumber].textContent = 'O'
            noChoiceList.push(parseInt(boxes[randomNumber].dataset.attribute))
            checkForEndGame()
        }
    }
 
    const checkForEndGame = (noChoiceListLength) => {
        const winningCombo = 'X,X,X'
        const losingCombo = 'O,O,O'
        let board = createBoard()
        let win = false
        let loss = false

        const rows = createRows(board)
        const columns = createColumns(board)
        const diagonals = createDiagonals(board)

        for(let i = 0;i < 3;i++) {
    
            if(rows[i] === winningCombo || 
                columns[i] === winningCombo ||
                diagonals[i] === winningCombo) {
                    postGameObject.createEndMessage(`${playerOneObject.name} won!`)
                    setScores('X')
                    win = true
                    return
                }
            else if(rows[i] === losingCombo ||
                columns[i] === losingCombo ||
                diagonals[i] === losingCombo) {
                    postGameObject.createEndMessage(`${playerTwoObject.name} won!`)
                    setScores('O')
                    loss = true
                    return
                }
            else if(noChoiceListLength === 9 && !win && !loss) {
                postGameObject.createEndMessage('Its a draw!')
                }
            }
    }

    const createBoard = () => {
        let boardArray = []
        for(let i = 0;i < boxes.length;i++) {
            if(boxes[i] !== '') {
                boardArray.push(boxes[i].textContent)
            }else {
                boardArray.push('')
            }
        }
        return boardArray
    }

    const createRows = (board) => {
        let rows = []
        let index = 0
        let counter = 3
        
        for(let i = 0;i < 3;i++) {
            let row = []
            let indexCounter = counter - 1
            for(let j = index;j < counter;j++) {

                if(j < indexCounter) {
                    row.push(board[j])
                }else if(j === indexCounter){
                    row.push(board[j])
                    rows.push(row.toString())
                    counter += 3
                    index += 3
                }
            }
        }
        return rows
    }

    const createColumns = (board) => {
        const columns = []
        const columnOne = [board[0],board[3],board[6]].toString()
        const columnTwo = [board[1],board[4],board[7]].toString()
        const columnThree = [board[2],board[5],board[8]].toString()
        columns.push(columnOne,columnTwo,columnThree)
        return columns 
    }

    const createDiagonals = (board) => {
        const diagonals = []
        const diagonalOne = [board[0],board[4],board[8]].toString()
        const diagonalTwo = [board[2],board[4],board[6]].toString()
        diagonals.push(diagonalOne,diagonalTwo)
        return diagonals 
    }

    const resetChoiceList = () => {
        noChoiceList = new Array
    }

    const setScores = (message) => {
        
        if(message === 'reset') {
            playerOneObject.name = ""
            playerOneObject.score = 0
            playerTwoObject.name = ""
            playerTwoObject.score = 0
        }
        else if(message === 'X') {
            playerOneObject.score++;
        }else if(message === 'O'){
            playerTwoObject.score++;
        }

        playerOneScore.textContent = playerOneObject.score
        playerTwoScore.textContent = playerTwoObject.score
    }

    boxes.forEach(box => {
        box.addEventListener('click', markBox)
        })

    return { getPlayers,resetChoiceList,boxes,setScores }

})()

const postGameObject = (() => {

    const modal = document.querySelector('.modal')
    const modal_text = document.querySelector('.modal-text')
    const restart = document.querySelector('.restart-button')
    const toMenuButton = document.getElementById('back-to-menu')

    const createEndMessage = (message) => {
       modal.setAttribute('style','display:block;')
       modal_text.textContent = message
        }
    
    const restartGame = () => {
        gamePageObject.boxes.forEach(box => box.textContent = "")
        modal.setAttribute('style','display:none;')
        gamePageObject.resetChoiceList()
    }

    const toMenu = () => {
        restartGame()
        gamePageObject.setScores('reset')
        startPageObject.toMenu()
    }

    restart.addEventListener('click', restartGame)
    toMenuButton.addEventListener('click', toMenu)

    return { createEndMessage,restartGame }
})()
