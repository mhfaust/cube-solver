const { pipe } = require('ramda')
const { down } = require('../layerRotations')
const { nArray } = require('../utils')

module.exports = (cubeSize = 3) => pipe(...nArray(cubeSize)(down))