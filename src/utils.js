const blanks = n => Array(n).fill('')

module.exports = {
    //generates HOF that takes a fn to populate a n-size array, with array indexes are arg for fn.
    nArray: (n) => (fn) => blanks(n).map((_,i) => fn(i)),
    //generates HOF that takes a fn(i,j) to pupulate a nxn 2-dim array,
    nnArray: (n) => (fn) => blanks(n).map((_,i) => blanks(n).map((_,j) => fn(i,j)))
}