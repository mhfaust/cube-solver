const { pipe } = require('ramda')
const { zNeg } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(zNeg))