const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {number[][]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n")
        .map(line => line.split("").map(c => +c))
}

/**
 * 
 * @param {number[][]} field 
 * @param {number} row 
 * @param {number} col 
 * @param {number} maxRow 
 * @param {number} maxCol 
 * @param {number} flashCount 
 * @returns {number}
 */
const incrementCell = (field, row, col, maxRow, maxCol, flashCount) => {
    const cell = field[row][col]
    if (cell < 0) {
        return flashCount
    }

    let newValue = cell + 1
    if (newValue > 9) {
        newValue = Number.MIN_SAFE_INTEGER
        flashCount++
    }

    field[row][col] = newValue

    if (newValue === Number.MIN_SAFE_INTEGER) {
        if (row > 0) {
            const targetRow = row - 1

            if (col > 0) {
                const targetCol = col - 1
                flashCount = incrementCell(field, targetRow, targetCol, maxRow, maxCol, flashCount)
            }

            flashCount = incrementCell(field, targetRow, col, maxRow, maxCol, flashCount)

            if (col < maxCol - 1) {
                const targetCol = col + 1
                flashCount = incrementCell(field, targetRow, targetCol, maxRow, maxCol, flashCount)
            }
        }

        if (col > 0) {
            const targetCol = col - 1
            flashCount = incrementCell(field, row, targetCol, maxRow, maxCol, flashCount)
        }

        if (col < maxCol - 1) {
            const targetCol = col + 1
            flashCount = incrementCell(field, row, targetCol, maxRow, maxCol, flashCount)
        }

        if (row < maxRow - 1) {
            const targetRow = row + 1

            if (col > 0) {
                const targetCol = col - 1
                flashCount =  incrementCell(field, targetRow, targetCol, maxRow, maxCol, flashCount)
            }

            flashCount = incrementCell(field, targetRow, col, maxRow, maxCol, flashCount)

            if (col < maxCol - 1) {
                const targetCol = col + 1
                flashCount = incrementCell(field, targetRow, targetCol, maxRow, maxCol, flashCount)
            }
        }
    }

    return flashCount
}

/**
 * 
 * @param {number} field 
 * @param {number} maxRow 
 * @param {number} maxCol 
 */
const zeroField = (field, maxRow, maxCol) => {
    for (let row = 0; row < maxRow; row++) {
        for (let col = 0; col < maxCol; col++) {
            const cell = field[row][col]
            if (cell < 0) {
                field[row][col] = 0
            }
        }
    }
}

/**
 * 
 * @param {number[][]} field
 * @param {number} flashCount
 * @returns {number}
 */
const incrementField = (field) => {
    const maxRow = field.length
    const maxCol = field[0].length
    let flashCount = 0
    for (let row = 0; row < maxRow; row++) {
        for (let col = 0; col < maxCol; col++) {
            flashCount += incrementCell(field, row, col, maxRow, maxCol, 0)
        }
    }

    zeroField(field, maxRow, maxCol)
    return flashCount
}

const main = async () => {
    const field = await readInput()
    let flashCount = 0
    for (let loop = 0; loop < 100; loop++) {
        flashCount += incrementField(field)
    }

    console.log(flashCount)
}

main()
