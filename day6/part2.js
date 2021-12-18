const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {number[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split(",").map(s => +s)
}

const days = 256

/**
 * 
 * @param {number[]} fishToBeBornPerDay 
 * @param {number} dayOffSet 
 * @param {number} initialFishOffset 
 */
const addFish = (fishToBeBornPerDay, dayOffSet, initialFishOffset, numberOfFishToBorn) => {
    const breedingCycle = 7
    const fish = dayOffSet + initialFishOffset
    fishToBeBornPerDay[fish] += numberOfFishToBorn
    const daysForNormalBreeding = Math.floor((days - fish) / breedingCycle)
    for (let breedingIndex = 1; breedingIndex < daysForNormalBreeding + 1; breedingIndex++) {
        fishToBeBornPerDay[fish + (breedingIndex * breedingCycle)] += numberOfFishToBorn
    }
}

const main = async () => {
    const initialFishes = await readInput()
    let oceanSize = initialFishes.length
    const fishToBeBornPerDay = new Array(1000).fill(0)
    initialFishes.forEach(fish => {
        addFish(fishToBeBornPerDay, 0, fish, 1)
    })

    for (let day = 0; day < days; day++) {
        const fishToBeBornToday = fishToBeBornPerDay[day]
        addFish(fishToBeBornPerDay, day, 9, fishToBeBornToday)
        oceanSize += fishToBeBornToday
        // console.log(`Day ${day + 1} - ${oceanSize}`)
    }

    console.dir(oceanSize)
}

main()
