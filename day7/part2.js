const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {number[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split(",").map(s => +s)
}

/**
 * Returns the fuel to align at that position
 * @param {number[]} crabPositions 
 * @param {number[]} stepCosts
 * @param {number} target 
 * @returns {number}
 */
const alignAtPosition = (crabPositions, stepCosts, target) => {
    let fuelCost = 0
    crabPositions.forEach(crab => {
        let stepsNeeded = 0
        if (crab >= target) {
            stepsNeeded += crab - target
        } else {
            stepsNeeded += target - crab
        }

        fuelCost += stepCosts[stepsNeeded]
    })

    return fuelCost
}

/**
 * Returns a table of costs for the steps
 * @param {number} max 
 * @returns {number[]}
 */
const stepCost = (max) => {
    const result = []
    for (let index = 0; index < max + 1; index++) {
        let cost = 0
        for (let number = index; number > 0; number--) {
            cost += number
        }

        result.push(cost)
    }

    return result
}

const main = async () => {
    const crabPositions = await readInput()
    const range = Math.max(...crabPositions) + 1
    const stepCosts = stepCost(range)
    let bestTarget = 0
    let bestFuel = alignAtPosition(crabPositions, stepCosts, 0)
    for (let index = 1; index < range; index++) {
       const fuelCost = alignAtPosition(crabPositions, stepCosts, index)
       if (fuelCost < bestFuel) {
           bestFuel = fuelCost
           bestTarget = index
       }
    }

    console.log(`Aligning at ${bestTarget} cost ${bestFuel}`)
}

main()
