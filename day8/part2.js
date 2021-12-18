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
 * 
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

/**
 * @typedef {Object} numberMap
 * @property {string} segment
 * @property {number} number
 */

/**
 * 
 * @param {string} shorterWord 
 * @param {string} longerWord 
 * @returns {boolean}
 */
const hasEverything = (shorterWord, longerWord) => {
    let result = true
    shorterWord.split("").forEach(number1Char => {
        const letterPos = longerWord.split("").indexOf(number1Char)
        if (letterPos === -1) {
            result = false
        }
    })

    return result
}

/**
 * 
 * @param {string} shorterWord 
 * @param {string} longerWord 
 * @returns {string}
 */
const determineMissingLetter = (shorterWord, longerWord) => {
    let result = ""
    longerWord.split("").forEach(number1Char => {
        const letterPos = shorterWord.split("").indexOf(number1Char)
        if (letterPos === -1) {
            result = number1Char
        }
    })

    return result
}

/**
 * @typedef {Object} numberInfo
 * @property {string} segment
 * @property {bottomBar} string
 */

/**
 * 
 * @param {numberMap[]} segments 
 * @param {string} one 
 * @param {string} four 
 * @param {string} seven 
 * @returns {numberInfo}
 */
const findNine = (segments, one, four, seven) => {
    const possibles = segments.filter(segment => segment.segment.length === 6) // 9, 6, 0
    const oneFourSeven = [...new Set(one.split("").concat(...four.split("")).concat(...seven.split("")))].join("")
    return possibles.filter(p => hasEverything(oneFourSeven, p.segment)).map(p => {
        const bottomBar = determineMissingLetter(oneFourSeven, p.segment)
        return {
            segment: p.segment,
            bottomBar,
        }
    })[0]
}

/**
 * @typedef {Object} sixOrZero
 * @property {numberInfo} six
 * @property {numberInfo} zero
 */

/**
 * 
 * @param {numberMap[]} segments 
 * @param {string} one 
 * @returns {sixOrZero}
 */
const findSixAndZero = (segments, one) => {
    const possibles = segments.filter(segment => segment.segment.length === 6 && segment.number === undefined) // 6, 0
    const zero = possibles.filter(p => hasEverything(one, p.segment))[0]
    const six = possibles.filter(p => !hasEverything(one, p.segment))[0]
    return {
        six,
        zero
    }
}

/**
 * 
 * @param {numberMap[]} segments 
 * @param {string} one 
 * @returns {numberInfo}
 */
const findThree = (segments, one) => {
    const possibles = segments.filter(segment => segment.number === undefined) // 2, 5, 3
    return possibles.filter(p => hasEverything(one, p.segment))[0]
}

/**
 * @typedef {Object} twoOrFive
 * @property {numberInfo} two
 * @property {numberInfo} five
 */

/**
 * 
 * @param {numberMap[]} segments 
 * @param {string} one 
 * @returns {twoOrFive}
 */
 const findTwoOrFive = (segments, six) => {
    const possibles = segments.filter(segment => segment.number === undefined) // 2, 5
    const five = possibles.filter(p => hasEverything(p.segment, six))[0]
    const two = possibles.filter(p => !hasEverything(p.segment, six))[0]
    return {
        five,
        two
    }
}

/**
 * 
 * @param {string[]} segments 
 * @returns {numberMap[]}
 */
const determineNumbers = (segments) => {
    const result = segments.map(segment => {
        return {
            number: determineNumberSimple(segment),
            segment,
        }
    })

    const one = result.find(s => s.number == 1)
    const four = result.find(s => s.number == 4)
    const seven = result.find(s => s.number == 7)

    const nineInfo = findNine(result, one.segment, four.segment, seven.segment)
    const nine = result.find(s => s.segment === nineInfo.segment)
    nine.number = 9

    const sixOrZero = findSixAndZero(result, one.segment)

    const six = result.find(s => s.segment === sixOrZero.six.segment)
    six.number = 6
    const zero = result.find(s => s.segment === sixOrZero.zero.segment)
    zero.number = 0

    const threeInfo = findThree(result, one.segment) 
    const three = result.find(s => s.segment === threeInfo.segment)
    three.number = 3

    const twoOrFive = findTwoOrFive(result, six.segment)
    const two = result.find(s => s.segment === twoOrFive.two.segment)
    two.number = 2

    const five = result.find(s => s.segment === twoOrFive.five.segment)
    five.number = 5

    return result
}

/**
 * 
 * @param {string} word1 
 * @param {string} word2 
 * @returns {boolean}
 */
const exactMatch = (word1, word2) => {
    if (word1.length != word2.length) {
        return false
    }

    if (!hasEverything(word1, word2)) {
        return false
    }

    if (!hasEverything(word2, word1)) {
        return false
    }

    return true
}

const main = async () => {
    const data = await readInput()
    const answer = data.map(d => {
        const numberMap = determineNumbers(d.numbers)
        let answer = ""
        d.answers.forEach(a => {
            const digit = numberMap.find(nm => exactMatch(nm.segment, a))
            answer += digit.number.toString()
        })

        return +answer
    }).reduce((previous, aggregate) => aggregate += previous, 0)

    console.dir(answer)
}

main()
