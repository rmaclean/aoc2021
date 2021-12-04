const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {string[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n")
}

const main = async () => {
    const rawData = await readInput()

    const tabledData = rawData
        .map(line => line.split(""))

    const transposed = tabledData[0].map(_ => []);

    tabledData.forEach(value => {
        value.map((item, index) => transposed[index].push(item))
    })

    const numberOfOnes = []
    transposed.forEach(row =>
        numberOfOnes.push(row.filter(bit => bit === "1").length) 
    )

    const halfNumberOfBits = transposed[0].length / 2

    let gamma = ""
    let epsilon = ""

    transposed.forEach(row => {
        const numberOfOnes = row.filter(i => i === "1").length
        if (numberOfOnes > halfNumberOfBits) {
            gamma += "1"
            epsilon += "0"
        } else {
            gamma += "0"
            epsilon += "1"
        }
    })

    const decimalGamma = parseInt(gamma, 2)
    const decimalEpsilon = parseInt(epsilon, 2)
    console.log(decimalGamma * decimalEpsilon)
}

main()