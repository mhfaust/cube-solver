import { colors } from './constants'
const { W, R, Y, O, B, G, } = colors

const nSquareOfColor = (n, color) => Array(n).fill('').map(a => Array(n).fill(color))

export default (n = 3) => ({
    front:  nSquareOfColor(n, W),
    right:  nSquareOfColor(n, R), 
    back:   nSquareOfColor(n, Y), 
    left:   nSquareOfColor(n, O), 
    top:    nSquareOfColor(n, B), 
    bottom: nSquareOfColor(n, G), 
})