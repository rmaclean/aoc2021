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
 */
const incrementCell = (field, row, col, maxRow, maxCol) => {
    const cell = field[row][col]
    if (cell < 0) {
        return
    }

    let newValue = cell + 1
    if (newValue > 9) {
        newValue = Number.MIN_SAFE_INTEGER
    }

    field[row][col] = newValue

    if (newValue === Number.MIN_SAFE_INTEGER) {
        if (row > 0) {
            const targetRow = row - 1

            if (col > 0) {
                const targetCol = col - 1
                incrementCell(field, targetRow, targetCol, maxRow, maxCol)
            }

            incrementCell(field, targetRow, col, maxRow, maxCol)

            if (col < maxCol - 1) {
                const targetCol = col + 1
               incrementCell(field, targetRow, targetCol, maxRow, maxCol)
            }
        }

        if (col > 0) {
            const targetCol = col - 1
            incrementCell(field, row, targetCol, maxRow, maxCol)
        }

        if (col < maxCol - 1) {
            const targetCol = col + 1
            incrementCell(field, row, targetCol, maxRow, maxCol)
        }

        if (row < maxRow - 1) {
            const targetRow = row + 1

            if (col > 0) {
                const targetCol = col - 1
                incrementCell(field, targetRow, targetCol, maxRow, maxCol)
            }

           incrementCell(field, targetRow, col, maxRow, maxCol)

            if (col < maxCol - 1) {
                const targetCol = col + 1
                incrementCell(field, targetRow, targetCol, maxRow, maxCol)
            }
        }
    }
}

/**
 * 
 * @param {number} field 
 * @param {number} maxRow 
 * @param {number} maxCol 
 * @returns {boolean}
 */
const zeroField = (field, maxRow, maxCol) => {
    let allZero = true
    for (let row = 0; row < maxRow; row++) {
        for (let col = 0; col < maxCol; col++) {
            const cell = field[row][col]
            if (cell < 0) {
                field[row][col] = 0
            } else {
                allZero = false
            }
        }
    }

    return allZero
}

/**
 * 
 * @param {number[][]} field
 * @returns {boolean}
 */
const incrementField = (field) => {
    const maxRow = field.length
    const maxCol = field[0].length
    for (let row = 0; row < maxRow; row++) {
        for (let col = 0; col < maxCol; col++) {
            incrementCell(field, row, col, maxRow, maxCol, 0)
        }
    }

    return zeroField(field, maxRow, maxCol)
}

const main = async () => {
    const field = await readInput()
    let loop = 0 
    let tooDark = true
    do {
        loop++
        if (incrementField(field)) {
            tooDark = false
        }
    } while (tooDark);

    console.log(loop)
}

main()
