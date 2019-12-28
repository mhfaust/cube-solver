const { equatorFaces } = require('../../../constants')



function nextCorner(cube){
    const bottomColor = cube.bottom[1][1]

    for(let faceName of equatorFaces){
        for(let col of [0,2]){
            if(cube[faceName][2][col] === bottomColor){
                return {
                    faceName,
                    
                }
            }
        }

    }


    module.exports = { nextCorner }
}