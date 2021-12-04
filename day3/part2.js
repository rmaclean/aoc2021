const fs = require('fs').promises

/**
 * reads the input.txt file
 * @returns {string[]}
 */
const readInput = async () => {
    const inputDataRaw = await fs.readFile("./input.txt")
    return inputDataRaw.toString().split("\n")
}

/**
 * @param {string[][]} tableData
 * @param {boolean | undefined} scanForSignificant
 * @param {number | undefined} index
 * @returns {string}
 */
const scanData = (tableData, scanForSignificant, index) => {
    if (index === undefined) {
        index = 0
    }

    if (scanForSignificant === undefined) {
        scanForSignificant = true
    }
    
    const transposed = tableData[0].map(_ => []);
    
    tableData.forEach(value => {
        value.map((item, index) => transposed[index].push(item))
    })

    const row = transposed[index]
    const halfNumberOfBits = row.length / 2

    const numberOfOnes = row.filter(i => i === "1").length
    let significantBit = "0"
    if (numberOfOnes >= halfNumberOfBits) {
        significantBit = "1"
    }

    let insignificantBit = "0"
    if (significantBit === "0") {
        insignificantBit = "1"
    }

    let bitToScanFor = ""
    if (scanForSignificant) {
        bitToScanFor = significantBit
    } else {
        bitToScanFor = insignificantBit
    }

    const newTabledData = tableData.filter(data => data[index] === bitToScanFor)

    if (newTabledData.length === 1) {
        return newTabledData[0].join("")
    } else {
        return scanData(newTabledData, scanForSignificant, index + 1)
    }
}

const main = async () => {
    const rawData = await readInput()

    const tabledData = rawData
        .map(line => line.split(""))

    const oxygen = scanData(tabledData.slice())
    const co2 = scanData(tabledData.slice(), false)

    console.log(parseInt(oxygen, 2) * parseInt(co2, 2))
}

main()