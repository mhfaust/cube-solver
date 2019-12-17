const { pipe } = require('ramda')
const { counterClockwise } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(counterClockwise))