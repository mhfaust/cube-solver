const { pipe } = require('ramda')
const { clockwise } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(clockwise))