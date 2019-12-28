const parseFaces = (faces) => {
    return Object.entries(faces).reduce((cube, [key, facesStr]) => {
        const rows = facesStr.split('-')
        cube[key] = rows.map(row => row.split(''))
        return cube
    }, {})
}

module.exports = {
    parseFaces
}