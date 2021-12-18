const fs = require('fs').promises

const lineParser = /(?<number1>\w+)\s(?<number2>\w+)\s(?<number3>\w+)\s(?<number4>\w+)\s(?<number5>\w+)\s(?<number6>\w+)\s(?<number7>\w+)\s(?<number8>\w+)\s(?<number9>\w+)\s(?<number10>\w+)\s\|\s(?<answer1>\w+)\s(?<answer2>\w+)\s(?<answer3>\w+)\s(?<answer4>\w+)/

/**
 * @typedef {Object} segmentData
 * @property {string[]} numbers
 * @property {string[]} answers
 */

/**
 * reads the input.txt file
 * @returns {segmentData[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n").map(line => {
        const parsed = lineParser.exec(line).groups
        return {
            numbers: [
                parsed.number1,
                parsed.number2,
                parsed.number3,
                parsed.number4,
                parsed.number5,
                parsed.number6,
                parsed.number7,
                parsed.number8,
                parsed.number9,
                parsed.number10,
            ],
            answers: [
                parsed.answer1,
                parsed.answer2,
                parsed.answer3,
                parsed.answer4,
            ],
        }
    })
}

/**
 * I bet in part 2 they will want all numbers... but this just 1, 4, 7 and 8
 * @param {string} number 
 * @returns {number | undefined}
 */
const determineNumberSimple = (number) => {
    switch (number.length) {
        case 2:
            return 1
        case 3:
            return 7
        case 4:
            return 4
        case 7:
            return 8
        default:
            return undefined
    }
}

const main = async () => {
    const data = await readInput()
    const answer = data.flatMap(segment => segment.answers)
                       .map(answer => determineNumberSimple(answer))
                       .filter(number => number !== undefined)
                       .length

    console.log(`Simple numbers appear ${answer} times`)
}

main()
