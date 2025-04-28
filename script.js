
function gameBoard() {
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
}


function Players() {
    wins = 0;
    mark = 0;

    const choosePlayerSpot = (chooseSpot, r, c) => {
        let res = chooseSpot(mark, r, c)
        while (!res) {
            res = chooseSpot(mark, r, c)
        }

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

    const getMark = (symbol) => {
        return mark;
    }

    return { choosePlayerSpot, giveWin, getWins, giveMark, getMark }
}



