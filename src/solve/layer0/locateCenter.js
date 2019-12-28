const { faceNames } = require('../../constants')

const locateCenter = (color, cube) => {
    return faceNames.find(faceName => cube[faceName][1][1] === color)
}

module.exports = { locateCenter }   