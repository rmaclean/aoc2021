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
const scoring = [3, 57, 1197, 25137]

/**
 * 
 * @param {string} line 
 * @returns {number}
 */
const invalidScoring = (line) => {
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
            return scoring[closingIndex]
        }
    }

    return 0
}

const main = async () => {
    const lines = await readInput()
    console.log(lines.map(l => invalidScoring(l)).reduce((previous, aggregate) => aggregate += previous, 0))
}

main()
