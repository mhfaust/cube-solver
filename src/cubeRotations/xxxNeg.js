const { pipe } = require('ramda')
const { xNeg } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(xNeg))