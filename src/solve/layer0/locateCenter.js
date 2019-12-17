const { faceHaving } = require('./index')

const locateCenter = (color, cube) => faceHaving(f => f[1][1] === color, cube)

module.exports = { locateCenter }