const { nArray, nnArray } = require('./utils')

module.exports = {
    scrambledCube: () => JSON.parse('{"front":[["O","O","B"],["G","W","Y"],["W","B","B"]],"back":[["Y","G","Y"],["Y","Y","O"],["G","B","B"]],"right":[["O","Y","O"],["R","R","B"],["R","G","R"]],"left":[["R","R","Y"],["W","O","O"],["Y","W","O"]],"top":[["G","W","G"],["W","B","G"],["B","Y","W"]],"bottom":[["G","R","W"],["B","G","R"],["R","O","W"]]}'),
    allUniqueTilesCube: () => ['front', 'back', 'right', 'left', 'top', 'bottom']
        .reduce(
            (cube, face) => ({
                ...cube,
                [face]: nnArray(3)((i,j) => `${face} face, row ${i}, column ${j}`)
            })
            , {}
        )
}


