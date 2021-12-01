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
            value: lines[0],
            change: changeState.NOCHANGE,
        }
    ]

    for (let index = 1; index < lines.length; index++) {
        const current = lines[index]
        const previous = lines[index - 1]
        const difference = previous - current

        let change = changeState.NOCHANGE
        if (difference < 0) {
            change = changeState.INCREASE
        } else {
            change = changeState.DECREASE
        }


        data.push(
            {
                index: index,
                value: current,
                change: change,
            }
        )
    }

    console.log(data.filter(item => item.change === changeState.INCREASE).length)
}

main()

/**
 * @typedef {Object} dataEntry
 * @property {number} index - index in the data set
 * @property {number} value - the value at the index
 * @property {changeState} change - the difference to the previous index
 */