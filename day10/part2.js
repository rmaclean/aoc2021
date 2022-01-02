const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {string[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n")
}

const opening = ["(", "[", "{", "<"]
const closing = [")", "]", "}", ">"]
const scoring = [1, 2, 3, 4]

/**
 * 
 * @param {string} line 
 * @returns {string[]}
 */
const getIncomplete = (line) => {
    const stack = []
    for (const c of line.split('')) {
        if (opening.find(i => i === c)) {
            stack.push(c)
            continue
        }

        const closingIndex = closing.indexOf(c)
        const lastOpening = stack.pop()
        const shouldBe = opening[closingIndex]
        if (lastOpening !== shouldBe) {
            return []
        }
    }

    return stack
}

/**
 * 
 * @param {string[]} stack 
 * @returns {number}
 */
const scoreStack = (stack) => {
    let result = 0
    for (const c of stack.reverse()) {
        result *= 5
        const index = opening.indexOf(c)
        const score = scoring[index]
        result += score
    }

    return result
}

/**
 * 
 * @param {number[]} values 
 * @returns number
 */
const getMiddleValue = (values) => {
    const sortedValues = values.sort((a, b) => (a - b));
    const middleIndex = Math.floor(values.length / 2)
    return sortedValues[middleIndex]
}

const main = async () => {
    const lines = await readInput()
    console.log(getMiddleValue(lines
        .map(l => getIncomplete(l))
        .filter(stack => stack.length > 0)
        .map(stack => scoreStack(stack))
    ))
}

main()
