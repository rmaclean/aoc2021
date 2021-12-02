const fs = require('fs').promises;

/**
 * reads the input.txt file
 * @returns {string[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n")
}

const lineParserRegex = /(?<action>[a-z]+)\s(?<size>\d)/

const ACTION = {
    UP: "up",
    DOWN: "down",
    FORWARD: "forward",
}

/**
 * @typedef {Object} instruction
 * @property {ACTION} action - the action to take
 * @property {string} size - the size of the movement
 */

/**
 * 
 * @param {string} s
 * @returns {instruction}
 */
const parseLine = (s) => {
    return { action, size } = lineParserRegex.exec(s).groups
}

const main = async () => {
    const lines = await readInput();
    const data = lines.map(s => parseLine(s))
    let position = 0
    let depth = 0
    data.forEach(i => {
        switch (i.action) {
            case ACTION.FORWARD: {
                position += (+i.size) 
                break;
            }
            case ACTION.DOWN: {
                depth += (+i.size) 
                break
            }
            case ACTION.UP: {
                depth -= (+i.size)  
                break
            }
        }
    })

    console.table({
        position,
        depth,
        result: position * depth
    })
}

main()