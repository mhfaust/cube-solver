const { floor, min } = Math
const ps = ['','0','00','000']

/**
 * 
 * @param n the number
 * @param width how many places are needed (e.g. to diplay 04, p = 2)
 * @returns 
 */
export const pad0s = (n: number, width = 2) => {
  const s = n.toString()
  return `${ps[min(width - s.length)]}${s}`
}

/**
 * 
 * @param milis time in miliseconds
 * @returns [1/00 s, seconds, minutes, hours]
 */
const splitTime = (milis: number) => ([
  floor(milis / 10) % 100, // hundredths of a second
  floor(milis / 1000) % 60, // seconds
  floor(milis / 60000) % 60, // minutes
  floor (milis / 3600000), // hours
])

export const stopWatchTime = (milis: number | undefined) => {
  if(milis === undefined) {
    return ''
  }
  const [ d, s, m, h ] = splitTime(milis)
  return `${pad0s(h)}:${pad0s(m)}:${pad0s(s)}.${pad0s(d)}`
}

export const reportTime = (milis: number | undefined) => {
  if(milis === undefined) {
    return ''
  }
  const [ d, s, m, h ] = splitTime(milis)
  if (h) {
    return `${h} hours, ${m}, minutes, and ${s}.${pad0s(d)} seconds`
  }
  if(m) {
    return `${m}, minutes, and ${s}.${pad0s(d)} seconds`
  }
  if (s) {
    return `${s}.${pad0s(d)} seconds`
  } 
  return `0.${pad0s(d)} seconds`
}
