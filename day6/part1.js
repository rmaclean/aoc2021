const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {string[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split(",").map(s => +s)
}

const main = async () => {
    let fishes = await readInput()
    for (let day = 0; day < 80; day++) {
        const newFish = []
        fishes = fishes.map(fish => {
            let newValue = fish - 1
            if (newValue < 0) {
                newFish.push(8)
                newValue = 6
            }

            return newValue
        }).concat(...newFish)
    }

    console.log(fishes.length)
}

main()
