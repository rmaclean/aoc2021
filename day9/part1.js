const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {number[][]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n").map(line => {
        return line.split("").map(c => +c)
    })
}

/**
 * @typedef {Object} lowNeighbourInfo
 * @property {number} lowestNeighbour
 * @property {number[]} neighbours
 * @property {number} col
 * @property {number} row
 */

/**
 * 
 * @param {number[][]} map 
 * @param {number} width 
 * @param {number} height 
 * @param {number} row 
 * @param {number} col
 * @returns {lowNeighbourInfo} 
 */
const determineLowestNeighbour = (map, width, height, row, col) => {
    const neighbours = []
    if (row > 0) {
        neighbours.push(map[row - 1][col])
    }

    if (row + 1 < height) {
        neighbours.push(map[row + 1][col])
    }

    if (col > 0) {
        neighbours.push(map[row][col - 1])
    }

    if (col + 1 < width) {
        neighbours.push(map[row][col + 1])
    }

    return {
        col,
        row,
        neighbours,
        lowestNeighbour: Math.min(...neighbours)
    }
}

const main = async () => {
    const map = await readInput()
    const width = map[0].length
    const height = map.length
    const lowPointRisk = []

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const value = map[row][col]
            const lowestNeighbour = determineLowestNeighbour(map, width, height, row, col)
            if (value < lowestNeighbour.lowestNeighbour) {
                lowPointRisk.push(value + 1)
            }
        }
    }

    const answer = lowPointRisk.reduce((previous, aggregate) => aggregate += previous, 0)

    console.log(answer)
}

main()
