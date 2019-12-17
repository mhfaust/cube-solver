const { curry } = require('ramda')

module.exports = (transforms) => {
    return (prevCube) => Object.entries(transforms).reduce((accum, [sideName, transform]) => {
        accum[sideName] = transform(sideName, prevCube)
        return accum
    }, {})
}