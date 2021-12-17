const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {string[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n")
}

const lineParserRegex = /(?<x1>\d+),(?<y1>\d+)\s->\s(?<x2>\d+),(?<y2>\d+)/

/**
 * 
 * @param {coords} coords 
 * @returns {boolean}
 */
const isAStraightLine = (coords) => {
    return coords.x1 === coords.x2 || coords.y1 === coords.y2
}

/**
 * 
 * @param {coords[]} allValues 
 * @returns {number[][]}
 */
const initFloor = (allValues) => {
    const largestX = Math.max(...allValues.flatMap(coord => [coord.x1, coord.x2])) + 1
    const largestY = Math.max(...allValues.flatMap(coord => [coord.y1, coord.y2])) + 1
    const result = []
    for (let y = 0; y < largestY; y++) {
        result.push(new Array(largestX).fill(0))   
    }

    return result
}

/**
 * 
 * @param {coord} coord 
 * @param {number[][]} oceanFloor 
 */
const setOceanData = (coord, oceanFloor) => {
    if (coord.x1 === coord.x2) {
        // vertical line
        const min = Math.min(coord.y1, coord.y2)
        const max = Math.max(coord.y1, coord.y2)
        for (let index = min; index < max + 1; index++) {
           oceanFloor[index][coord.x1]++
        }

        return
    }

    if (coord.y1 === coord.y2) {
        // horizontal line
        const min = Math.min(coord.x1, coord.x2)
        const max = Math.max(coord.x1, coord.x2)
        for (let index = min; index < max + 1; index++) {
           oceanFloor[coord.y1][index]++
        }
    }
}

const main = async () => {
    const data = (await readInput())
        .map(l => {
            const { x1, y1, x2, y2 } = lineParserRegex.exec(l).groups
            return {
                x1: +x1,
                x2: +x2,
                y1: +y1,
                y2: +y2,
            }
        })
        .filter(coords => isAStraightLine(coords))

    /** @member {number[][]} */
    const oceanFloor = initFloor(data)

    data.forEach(coord => {
        setOceanData(coord, oceanFloor)
    })

    const twos = oceanFloor.flatMap(row => row).filter(num => num >= 2).length
    console.dir(twos)
}

main()

/**
 * @typedef {Object} coords
 * @property {number} x1
 * @property {number} x2
 * @property {number} y1
 * @property {number} y2
 */