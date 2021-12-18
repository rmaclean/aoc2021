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
 * @param {nunber[]} crabPositions 
 * @param {number} target 
 * @returns {number}
 */
const alignAtPosition = (crabPositions, target) => {
    let fuelCost = 0
    crabPositions.forEach(crab => {
        if (crab >= target) {
            fuelCost += crab - target
        } else {
            fuelCost += target - crab
        }
    })

    return fuelCost
}

const main = async () => {
    const crabPositions = await readInput()
    const range = Math.max(...crabPositions) + 1
    let bestTarget = 0
    let bestFuel = alignAtPosition(crabPositions, 0)
    for (let index = 1; index < range; index++) {
       const fuelCost = alignAtPosition(crabPositions, index)
       if (fuelCost < bestFuel) {
           bestFuel = fuelCost
           bestTarget = index
       }
    }
   
    console.log(`Aligning at ${bestTarget} cost ${bestFuel}`)
}

main()
