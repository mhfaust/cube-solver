const { pipe } = require('ramda')
const { yNeg } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(yNeg))