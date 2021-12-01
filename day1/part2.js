const fs = require('fs').promises;

const main = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    const lines = inputDataRaw.toString().split("\n")

    /**
     * defines the change states
     * @readonly
     * @enum {string}
     */
    const changeState = {
        INCREASE: 'increase',
        DECREASE: 'decrease',
        NOCHANGE: 'nochange',
    }

    /**
     * @member {dataEntry[]}
     */
    const data = [
        {
            index: 0,
            value: (+lines[0]) + (+lines[1]) + (+lines[2]),
        }
    ]

    for (let index = 1; index < lines.length - 2; index++) {
        const current = +lines[index]
        const next = +lines[index + 1]
        const nextPlus1 = +lines[index + 2]

        const value = current + next + nextPlus1
        
        data.push(
            {
                index,
                value,
            }
        )
    }

    /** @member {changeState[]} */
    const changes = [
        changeState.NOCHANGE
    ]

    for (let index = 1; index < data.length; index++) {
        const previous = data[index - 1].value
        const current = data[index].value
        
        const difference = previous - current
        let change = changeState.NOCHANGE
        if (difference < 0) {
            change = changeState.INCREASE
        } else {
            change = changeState.DECREASE
        }

        changes.push(change)
    }

    console.log(changes.filter(item => item === changeState.INCREASE).length)
}

main()

/**
 * @typedef {Object} dataEntry
 * @property {number} index - index in the data set
 * @property {number} value - the value at the index
 */