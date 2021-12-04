const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {string[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n")
}

/**
 * @param {number[][]} board
 * @returns {boolean}
 */
const boardWon = (board) => {
    const horizontalWin = board.filter(row => row.join("").trim().length === 0)

    if (horizontalWin.length > 0) {
        return true
    }

    for (let column = 0; column < 5; column++) {
        let columnValue = ""
        for (let row = 0; row < 5; row++) {
            columnValue += board[row][column].toString()
        }

        if (columnValue.trim().length === 0) {
            return true
        }
    }

    return false
}

/**
 * @param {number[][]} board
 * @returns {number}
 */
const sumBoard = (board) => {
    let result = 0
    board.forEach(row => {
        row.forEach(col => {
            result += (+col)
        })
    })

    return result
}

const main = async () => {
    const rawData = await readInput()
    const numbers = rawData[0].split(",").map(value => +value)

    /** @member {int[][]} */
    const boards = []
    const boardCount = (rawData.length - 1) / 6
    for (let boardIndex = 0; boardIndex < boardCount; boardIndex++) {
        const startLine = 2 + (6 * boardIndex)
        const board = []
        for (let lineIndex = 0; lineIndex < 5; lineIndex++) {
            const line = rawData[startLine + lineIndex];
            board.push(line.split(" ").filter(value => value.length > 0).map(value => +value))
        }

        boards.push(board)
    }

    let winningBoard
    let winningNumber
    numbers.every(number => {
        boards.forEach(board => {
            board.forEach(row => {
                row.forEach((value, index) => {
                    if (value === number) {
                        row[index] = ""
                    }
                })
            })
        })

        const winningCards = boards.filter(board => boardWon(board))
        if (winningCards.length > 0) {
            winningBoard = winningCards[0]
            winningNumber = number
            return false
        }

        return true
    })

    console.log(sumBoard(winningBoard) * winningNumber)
}

main()