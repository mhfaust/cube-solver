const serializeFaces = (cube) => Object.entries(cube)
    .reduce((accum, [faceName, face]) => {
        return ({ ...accum, [faceName]: face.map(row => row.join('')).join('-')})
    }, {})
    
module.exports = { serializeFaces }