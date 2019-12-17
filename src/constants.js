const FRONT = 'front'
const RIGHT = 'right'
const BACK = 'back'
const LEFT = 'left'
const TOP = 'top'
const BOTTOM = 'bottom'

module.exports = {
    colors: Object.freeze({ R: 'R', B: 'B', G: 'G', Y: 'Y', O: 'O', W: 'W'}),
    faceNames: Object.freeze(['FRONT', 'RIGHT', 'BACK', 'LEFT', 'TOP', 'BOTTOM']),
    equatorFaces:  Object.freeze(['FRONT', 'RIGHT', 'BACK', 'LEFT']),
    oppositeFaces: Object.freeze({
        [FRONT]: BACK,
        [BACK]: FRONT,
        [LEFT]: RIGHT,
        [RIGHT]: LEFT,
        [TOP]: BOTTOM,
        [BOTTOM]: TOP
    })
} 
