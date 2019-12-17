const { pipe } = require('ramda')
const { left } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(left))