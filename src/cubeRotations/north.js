const { pipe } = require('ramda')
const { up } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(up))