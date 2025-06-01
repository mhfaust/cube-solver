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
    return `${h}h ${m}m ${s}.${pad0s(d)}s`
  }
  if(m) {
    return `${m}m ${s}.${pad0s(d)}s`
  }
  if (s) {
    return `${s}.${pad0s(d)}s`
  } 
  return `0.${pad0s(d)}s`
}

const getDateObject = (dateInput: unknown) => {
  if (dateInput instanceof Date) {
    return dateInput;
  } else if (typeof dateInput === 'string' || typeof dateInput === 'number') {
    return new Date(dateInput);
  } else {
    throw new Date();
  }
};

export function formatDate(dateInput: null | undefined | number | string | Date): string {
  if (!dateInput) {
    return '';
  }
  const date = getDateObject(dateInput);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad with leading zero if needed
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${month} ${day},  ${hours}:${minutes} ${ampm}`;
}