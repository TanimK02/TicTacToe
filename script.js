



const boardModule = (function gameBoard() {
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    const chooseSpot = (mark, r, c) => {
        if (mark == 0) {
            return false
        }
        if (board[r][c] == 0) {
            board[r][c] = mark
            return true
        }
        return false

    }

    const checkMate = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] != 0 && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                return board[i][0]
            }
            if (board[0][i] != 0 && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                return board[0][i]
            }
        }
        if (board[0][0] != 0 && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            return board[0][0]
        }
        if (board[2][0] != 0 && board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
            return board[0][0]
        }
        return 0
    }

    const checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    return false
                }
            }
        }
        return true
    }

    const resetBoard = () => {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    }

    const getBoard = () => {
        return board.map(row => [...row])

    }

    return { chooseSpot, checkMate, checkDraw, resetBoard, getBoard }
})();


function Players() {
    let wins = 0;
    let mark = 0;

    const choosePlayerSpot = (chooseSpot, r, c) => {
        let res = chooseSpot(mark, r, c)
        return res;

    }

    const giveWin = () => {
        wins++;
    }

    const getWins = () => {
        return wins;
    }

    const giveMark = (symbol) => {
        mark = symbol;
    }

    const getMark = () => {
        return mark;
    }

    return { choosePlayerSpot, giveWin, getWins, giveMark, getMark }
}



const game = (function Game() {
    let document = null;
    let boardModule = null;
    const computer = Players();
    const player = Players();
    let handleClick = (e) => {
        if (e.target.classList.contains("spot")) {
            let r = e.target.dataset.row;
            let c = e.target.dataset.col;
            r = Number(r)
            c = Number(c)
            if (!player.choosePlayerSpot(boardModule.chooseSpot, r, c)) {
                return
            }
            let img = document.createElement("img");
            boardCopy = boardModule.getBoard();

            if (boardCopy[r][c] == "X") {
                img.src = "assets/x-symbol-svgrepo-com.svg";
            }
            else if (boardCopy[r][c] == "O") {
                img.src = "assets/letter-o-svgrepo-com.svg";
            }
            e.target.appendChild(img);
            //check here
            let res = 0;
            if (boardModule.checkDraw()) {
                handleQuit();
            }
            res = boardModule.checkMate()
            if (res != 0) {
                if (res == player.getMark()) {
                    player.giveWin();
                    document.getElementById("playerWins").innerText = `${player.getWins()}`;
                    document.getElementById("winContainer").style.width = "100%";
                    document.getElementById("winContainer").style.height = "100%";
                    document.getElementById("winContainer").style.display = "flex";
                    setTimeout(() => {
                        document.getElementById("winContainer").style.width = "0%";
                        document.getElementById("winContainer").style.height = "0%";
                        document.getElementById("winContainer").style.display = "none";
                        handleQuit();
                    }, 3 * 1000)


                    return
                }
                else {
                    computer.giveWin();
                    document.getElementById("computerWins").innerText = `${computer.getWins()}`;
                    document.getElementById("loseContainer").style.width = "100%";
                    document.getElementById("loseContainer").style.height = "100%";
                    document.getElementById("loseContainer").style.display = "flex";
                    setTimeout(() => {
                        document.getElementById("loseContainer").style.width = "0%";
                        document.getElementById("loseContainer").style.height = "0%";
                        document.getElementById("loseContainer").style.display = "none";
                        handleQuit();
                    }, 3 * 1000)
                    return

                }
            }
            r = Math.floor(Math.random() * 3);
            c = Math.floor(Math.random() * 3);
            while (!
                computer.choosePlayerSpot(boardModule.chooseSpot,
                    r, c)) {
                r = Math.floor(Math.random() * 3);
                c = Math.floor(Math.random() * 3);
            }
            let children = gameBoard.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].dataset.row == r.toString() && children[i].dataset.col == c.toString()) {
                    let img = document.createElement("img");
                    boardCopy = boardModule.getBoard();

                    if (boardCopy[r][c] == "X") {
                        img.src = "assets/x-symbol-svgrepo-com.svg";
                    }
                    else if (boardCopy[r][c] == "O") {
                        img.src = "assets/letter-o-svgrepo-com.svg";
                    }
                    children[i].appendChild(img);
                }
            }
            //check here
            res = 0;
            if (boardModule.checkDraw()) {
                handleQuit();
            }
            res = boardModule.checkMate()
            if (res != 0) {
                if (res == player.getMark()) {
                    player.giveWin();
                    document.getElementById("playerWins").innerText = `${player.getWins()}`;
                    document.getElementById("winContainer").style.width = "100%";
                    document.getElementById("winContainer").style.height = "100%";
                    document.getElementById("winContainer").style.display = "flex";
                    setTimeout(() => {
                        document.getElementById("winContainer").style.width = "0%";
                        document.getElementById("winContainer").style.height = "0%";
                        document.getElementById("winContainer").style.display = "none";
                        handleQuit();
                    }, 3 * 1000)

                    return

                }
                else {
                    computer.giveWin();
                    document.getElementById("computerWins").innerText = `${computer.getWins()}`;
                    document.getElementById("loseContainer").style.width = "100%";
                    document.getElementById("loseContainer").style.height = "100%";
                    document.getElementById("loseContainer").style.display = "flex";
                    setTimeout(() => {
                        document.getElementById("loseContainer").style.width = "0%";
                        document.getElementById("loseContainer").style.height = "0%";
                        document.getElementById("loseContainer").style.display = "none";
                        handleQuit();
                    }, 3 * 1000)

                    return
                }
            }

        }
    }

    let handleQuit = () => {
        boardModule.resetBoard();
        let children = gameBoard.children;
        for (let i = 0; i < children.length; i++) {
            children[i].innerText = "";
        }
        document.getElementById("computerMark").innerText = `None`;
        document.getElementById("playerMark").innerText = `None`;
        gameBoard.removeEventListener("click", handleClick)
    }
    function start() {
        if (!document || !boardModule) {
            return null
        }
        const gameBoard = document.getElementById("gameBoard");
        const quitButton = document.getElementById("quitButton");
        quitButton.addEventListener("click", handleQuit)
        let random = Math.floor(Math.random() * 2);
        if (random == 1) {
            player.giveMark("X")
            computer.giveMark("O")
        }
        else {
            computer.giveMark("X")
            player.giveMark("O")
        }
        document.getElementById("computerMark").innerText = `${computer.getMark()}`;
        document.getElementById("playerMark").innerText = `${player.getMark()}`;
        if (random == 0) {
            r = Math.floor(Math.random() * 3);
            c = Math.floor(Math.random() * 3);
            while (!
                computer.choosePlayerSpot(boardModule.chooseSpot,
                    r, c)) {
                r = Math.floor(Math.random() * 3);
                c = Math.floor(Math.random() * 3)
            }
            let children = gameBoard.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].dataset.row == r.toString() && children[i].dataset.col == c.toString()) {
                    let img = document.createElement("img");
                    boardCopy = boardModule.getBoard();

                    if (boardCopy[r][c] == "X") {
                        img.src = "assets/x-symbol-svgrepo-com.svg";
                    }
                    else if (boardCopy[r][c] == "O") {
                        img.src = "assets/letter-o-svgrepo-com.svg";
                    }
                    children[i].appendChild(img);
                }
            }
        }




        gameBoard.addEventListener("click", handleClick)



    }

    function play(doc, boardM) {
        if (!doc || !boardM) {
            return null
        }
        document = doc;
        boardModule = boardM;
        const playButton = doc.getElementById("playButton");
        if (!playButton) {
            return
        }
        playButton.addEventListener("click", () => {
            start(doc);
        })
    }

    return { play };
})();

game.play(document, boardModule)
