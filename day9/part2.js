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
 * @typedef {Object} point
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
 * @returns {point | undefined} 
 */
const determineLowPoints = (map, width, height, row, col) => {
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

    const pointValue = map[row][col]
    const lowestNeighbour = Math.min(...neighbours)
    if (pointValue < lowestNeighbour) {
        return {
            col,
            row
        }
    } else {
        return undefined
    }
}

/**
 * 
 * @param {number} row 
 * @param {number} col 
 * @param {number} rowModifier 
 * @param {number} colModifier 
 * @param {number[][]} map 
 * @param {point[]} knownPoints
 * @returns {point | undefined} 
 */
const processPoint = (row, col, rowModifier, colModifier, map, knownPoints) => {
    const modifiedRow = row + rowModifier
    const modifiedCol = col + colModifier
    const positionalValue = map[modifiedRow][modifiedCol]
    const alreadyKnown = knownPoints.find(p => p.row === modifiedRow && p.col === modifiedCol) !== undefined
    if (positionalValue !== 9 && !alreadyKnown) {
        const point = {
            row: modifiedRow,
            col: modifiedCol,
        }

        return point
    }

    return undefined
}

/**
 * 
 * @param {point[]} target 
 * @param {point[]} points 
 */
const addPoints = (target, points) => {
    points.forEach(newPoint => {
        const alreadyExists = target.find(p => p.row === newPoint.row && p.col === newPoint.col)
        if (alreadyExists === undefined) {
            target.at(newPoint)
        }
    })
}

/**
 * 
 * @param {point} start
 * @param {number} width
 * @param {number} height
 * @param {number[][]} map 
 * @returns {point[]} 
 */
const determineBasin = (start, width, height, map, alreadyScanned) => {
    if (alreadyScanned === undefined) {
        alreadyScanned = []
    }

    if (alreadyScanned.find(p => p.col === start.col && p.row === start.row)) {
        return []
    }

    alreadyScanned.push(start)

    const row = start.row
    const col = start.col

    const value = map[row][col]
    if (value === 9) {
        return []
    }

    let result = [start]

    if (row > 0) {
        result = result.concat(...determineBasin({ row: row - 1, col }, width, height, map, alreadyScanned))
    }

    if (row + 1 < height) {
        result = result.concat(...determineBasin({ row: row + 1, col }, width, height, map, alreadyScanned))
    }

    if (col > 0) {
        result = result.concat(...determineBasin({ col: col - 1, row }, width, height, map, alreadyScanned))
    }

    if (col + 1 < width) {
        result = result.concat(...determineBasin({ col: col + 1, row }, width, height, map, alreadyScanned))
    }

    return result
}

const main = async () => {
    const map = await readInput()
    const width = map[0].length
    const height = map.length
    /** @member {point[]} */
    const lowPointRisk = []

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const lowestNeighbour = determineLowPoints(map, width, height, row, col)
            if (lowestNeighbour !== undefined) {
                lowPointRisk.push(lowestNeighbour)
            }
        }
    }

    const basins = lowPointRisk.map(p => determineBasin(p, width, height, map).length).sort((a, b) => (a - b) * -1);

    console.log(basins[0] * basins[1] * basins[2])
}

main()
