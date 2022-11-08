

const startPageObject = (() => {
    const start_button = document.querySelector('.start-button')
    const start_page = document.querySelector('.start-page')
    const game_page = document.querySelector('.gamePage')
    const playerOneInput = document.getElementById('playerOne')
    const playerTwoInput = document.getElementById('playerTwo')
    const playerOneScoreboard = document.querySelector('.player-one')
    const playerTwoScoreBoard = document.querySelector('.player-two')
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

    start_button.addEventListener('click', startGame)

    return { startGame,createPlayers }
})()

const gamePageObject = (() => {

    const boxes = document.querySelectorAll('.box')
    let noChoiceList = []
    let noChoiceListLength = noChoiceList.length
    let playerOneObject
    let playerTwoObject
    let againstComputerBool
    
    const getPlayers = (playerOne,playerTwo,againstComputer) => {
        playerOneObject = playerOne;
        playerTwoObject = playerTwo;
        againstComputerBool = againstComputer
    }

    const markBox = (e) => {
        if(e.target.textContent === 'X' || e.target.textContent === 'O') {
            return
        }else if(!againstComputerBool) {
            e.target.textContent = 'X'
            noChoiceList.push(parseInt(e.target.dataset.attribute))
        }else if(againstComputerBool) {
            e.target.textContent = 'X'
            noChoiceList.push(parseInt(e.target.dataset.attribute))
            aiChoice()
        }
    }

    const aiChoice = () => {
        if(noChoiceListLength === 9) {
            return
        }else {
            const randomNumber = Math.floor(Math.random() * 9)

            if(noChoiceList.includes(randomNumber)) {
                aiChoice()
                return
            }else {
                boxes[randomNumber].textContent = 'O'
                noChoiceList.push(parseInt(boxes[randomNumber].dataset.attribute))
                // console.log(noChoiceList)
                checkForEndGame()
            }
        }
    }
 
    const checkForEndGame = () => {
        const winningCombo = 'X,X,X'
        const losingCombo = 'O,O,O'
        let board = createBoard()
        let win = false
        let loss = false

        const rows = createRows(board)
        const columns = createColumns(board)
        const diagonals = createDiagonals(board)

        for(let i = 0;i < 3;i++) {
            console.log(rows[i])
            console.log(winningCombo)
            if(rows[i] === winningCombo || 
                columns[i] === winningCombo ||
                diagonals[i] === winningCombo) {
                    console.log('YOU WIN')
                    win = true
                }
            else if(rows[i] === losingCombo ||
                columns[i] === losingCombo ||
                diagonals[i] === losingCombo) {
                    console.log('YOU LOSE')
                    loss = true
                }
            else if(noChoiceListLength === 9 && !win && !loss) {
                console.log('TIE GAME')
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

    boxes.forEach(box => box.addEventListener('click', markBox))

    return { getPlayers }

})()






































// const displayController = (() => {

//     let noChoiceList = []
//     const playerChoice = (e) => {

//         if(e.target.textContent === 'X' || e.target.textContent === 'O') {
//             return
//         }
//         else if(noChoiceList.length % 2 === 0 && endMessageCreator.getPlayers()) {
//             e.target.textContent = 'X'
//             noChoiceList.push(parseInt(e.target.dataset.attribute))
//             checkForEndGame.checkWins(noChoiceList.length)
//         }
//         else if(noChoiceList.length % 2 !== 0 && endMessageCreator.getPlayers()) {
//             e.target.textContent = 'O'
//             noChoiceList.push(parseInt(e.target.dataset.attribute))
//             checkForEndGame.checkWins(noChoiceList.length)
//         }
//         else if(noChoiceList.length < 8) {
//             e.target.textContent = 'X'
//             noChoiceList.push(parseInt(e.target.dataset.attribute))
//         }
//         else if(noChoiceList.length === 8){
//             e.target.textContent = 'X'
//             noChoiceList.push(parseInt(e.target.dataset.attribute))
//             checkForEndGame.checkWins(noChoiceList.length)
//             return
//         }
//     }

//     const aiChoice = () => {

//         if(endMessageCreator.getPlayers() || noChoiceList.length === 8) {
//             console.log('ai choice')
//             return
//         }else {
//             let randomNumber = Math.floor(Math.random() * 9)
        
//             for(let i = 0;i < noChoiceList.length;i++) {
        
//                 if(noChoiceList.includes(randomNumber) && noChoiceList.length < 9) {
//                     aiChoice()
//                     return 
//                 }
//                 else if(noChoiceList.length < 9) {
//                     noChoiceList.push(randomNumber)
//                     gameFlow.setAiChoice(randomNumber)
//                     return
//                 }
//             }
//         }
//     }
//     const resetChoiceList = () => {
//         noChoiceList = new Array
//     }
//     return { playerChoice,aiChoice,resetChoiceList,noChoiceList }

// })()

// const gameFlow = (() => {

//     const boxes = document.querySelectorAll('.box')
//     boxes.forEach(box => {
        
//         box.addEventListener('click', displayController.playerChoice),
//         box.addEventListener('click', displayController.aiChoice)
// })
   
//     const setAiChoice = (randomNumber) => {
//         boxes[randomNumber].textContent = 'O'
//         checkForEndGame.checkWins(displayController.noChoiceList.length)
//         return
//     }

//     const createBoard = (message) => {

//         let board = []

//         if(message) {
//             board = new Array
//         }

//         for(let i = 0;i < boxes.length;i++) {
//             if(boxes[i].textContent === 'X') {
//                 board.push(1)
//             }else if(boxes[i].textContent === 'O') {
//                 board.push(0)}
//              else{board.push('')}
//         }
//         return board 
//     }

//     return { setAiChoice,createBoard,boxes }
// })()

// const checkForEndGame = (() => {
    
//     let winningCombo = '1,1,1'
//     let losingCombo = '0,0,0'
    
//     const checkWins = (noChoiceListLength) => {
        
//         const boardMarks = gameFlow.createBoard()
            
//         let rowOne = boardMarks.slice(0,3).toString()
//         let rowTwo = boardMarks.slice(3,6).toString()
//         let rowThree = boardMarks.slice(6,9).toString()

//         let columnOne = [boardMarks[0],boardMarks[3],boardMarks[6]].toString()
//         let columnTwo = [boardMarks[1],boardMarks[4],boardMarks[7]].toString()
//         let columnThree = [boardMarks[2],boardMarks[5],boardMarks[8]].toString()

//         let diagonalOne = [boardMarks[0],boardMarks[4],boardMarks[8]].toString()
//         let diagonalTwo = [boardMarks[2],boardMarks[4],boardMarks[6]].toString()
        
//         let testArray = [rowOne,rowTwo,rowThree,columnOne,columnTwo,columnThree,
//         diagonalOne,diagonalTwo]

//         for(let i = 0;i < 9;i++) {
//             if(testArray[i] === winningCombo) {
//                 win = true
//                 endMessageCreator.createEndMessage('YOU WIN!')
//                 endMessageCreator.setScore('WIN')
//                 endMessageCreator.getScore()
//                 return
//             }else if(testArray[i] === losingCombo) {
//                 loss = true
//                 endMessageCreator.createEndMessage('YOU LOSE!')
//                 endMessageCreator.setScore('LOSS')
//                 endMessageCreator.getScore()
//                 return
//             }else if(noChoiceListLength === 9 && !testArray.includes('1,1,1') && !testArray.includes('0,0,0')) {
//                 endMessageCreator.createEndMessage('ITS A DRAW!')
//                 return
//             }
//         }
//     }
//     return { checkWins }
// })()

// const endMessageCreator = (() => {

//     const start_button = document.querySelector('.start-button')
//     const start_page = document.querySelector('.start-page')
//     const game_page = document.querySelector('.gamePage')
//     const modal = document.querySelector('.modal')
//     const modal_text = document.querySelector('.modal-text')
//     const restart = document.querySelector('.restart-button')

//     const score_player_one = document.querySelector('.player-one')
//     const input_player_one = document.getElementById('playerOne')
//     const score_player_two = document.querySelector('.player-two')
//     const input_player_two = document.getElementById('playerTwo')
//     const computer = document.getElementById('computer')
//     const player_one_score = document.querySelector('.player-one-span')
//     const player_two_score = document.querySelector('.player-two-span')

//     const backToMenu = document.getElementById('back-to-menu')
    
//     let scores = []
    
//     const createEndMessage = (message) => {
//         modal.setAttribute('style','display:block;')
//         modal_text.textContent = message
//     }

//     const restartGame = () => {
//         gameFlow.boxes.forEach(box => box.textContent = "")
//         modal.setAttribute('style','display:none;')
//         displayController.resetChoiceList() 
//         gameFlow.createBoard(true)
//     }

//     const startGame = () => {
//         start_page.setAttribute('style','display:none;')
//         game_page.setAttribute('style','display:grid; grid-template-columns:1fr 1fr 1fr;')
//     }

//     const toMenu = () => {
//         restartGame()
//         getScore(true)
//         playerReset()
//         game_page.setAttribute('style', 'display:none;')
//         start_page.setAttribute('style', 'display:flex;')
//     }

//     const getPlayers = () => {
        
//         if(computer.checked && input_player_two.value !== "") {
//             alert("Play against another player or the computer")
//             game_page.setAttribute('style','display:none;')
//             start_page.setAttribute('style','display:flex; flex-direction:column;')
//         }
//         else if(computer.checked) {
//             input_player_one.defaultValue = 'Player one'
//             score_player_one.textContent = input_player_one.value
//             score_player_two.textContent = 'Computer'
//         }else if(!computer.checked){
//             input_player_one.defaultValue = 'Player one'
//             input_player_two.defaultValue = 'Player two'
//             score_player_one.textContent = input_player_one.value
//             score_player_two.textContent = input_player_two.value
//             let noComputer = true
//             return noComputer
//         }
//     }

//     const setScore = (message) => {
        
//         if(message === 'WIN') {
//             scores.push('x')
//         }
//         else if(message === 'LOSS') {
//             scores.push('o')
//         }
//     }

//     const getScore = (message) => {
//         let xScore = 0
//         let oScore = 0
//         for(let i = 0;i < scores.length;i++) {

//             if(message) {
//                 xScore = 0
//                 oScore = 0
//                 scores = new Array
//                 return
//             }
//             else if(scores[i] === 'x') {
//                 xScore += 1
//             }else if(scores[i] === 'o'){
//                 oScore += 1
//             }
//         }
//         player_one_score.textContent = `${xScore}`
//         player_two_score.textContent = `${oScore}`
//     }

//     const playerReset = () => {
//         player_one_score.textContent = ""
//         player_two_score.textContent = ""
//     }

//     restart.addEventListener('click', restartGame)
//     start_button.addEventListener('click', startGame)
//     start_button.addEventListener('click', getPlayers)
//     backToMenu.addEventListener('click', toMenu)
//     return { createEndMessage, restartGame, getPlayers,setScore,getScore,playerReset }
// })()

