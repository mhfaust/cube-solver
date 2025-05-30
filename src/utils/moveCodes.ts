
export const moveCodes =  [
	'U' , 'Ui' , 'D' , 'Di' , 'E' , 'Ei' ,
	'R' , 'Ri' , 'L' , 'Li' , 'M' , 'Mi' ,
	'F' , 'Fi' , 'B' , 'Bi' , 'S' , 'Si' ,
	'X' , 'Xi' , 'Y' , 'Yi' , 'Z' , 'Zi'
] as const

export type MoveCode = typeof moveCodes[number]

const inverseMoves: Record<MoveCode, MoveCode> = { 
  'U':'Ui','D':'Di','E':'Ei','R':'Ri','L':'Li','M':'Mi','F':'Fi','B':'Bi','S':'Si','X':'Xi','Y':'Yi','Z':'Zi',
  'Ui':'U','Di':'D','Ei':'E','Ri':'R','Li':'L','Mi':'M','Fi':'F','Bi':'B','Si':'S','Xi':'X','Yi':'Y','Zi':'Z',
}
export const inverse = (move: MoveCode) => inverseMoves[move]

export const keyCodes = [
	'u', 'U', 'd', 'D', 'e', 'E',
	'l', 'L', 'r', 'R', 'm', 'M',
	'f', 'F', 'b', 'B', 's', 'S',
	'x', 'X', 'y', 'Y', 'z', 'Z',
	'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '[', ']'
	// 'j', 
	// 'J', 
	// 'g',
	// 'G',
	// 'f', 
	// 'h',
	// 'i',
	// 'k',
	// 'e',
	// 'd',
	// 'm', 
	// 'v',
	// 'c', 
	// 'n',
	// 's',
	// 'l',
	// 'a', 
	// 'z',
	// ';', 
	// '.',
	// 'o',
	// 'w',
	// 'x',
	// ',',
] as const
export type KeyCode = typeof keyCodes[number]

const ks = new Set(keyCodes)
export const asKeyCode = (s: string): KeyCode | undefined => {
	if(ks.has(s as KeyCode)) {
		return s as KeyCode
	}
	return undefined
}

// export const keyMoves: Record<string, MoveCode> = {
// 	'j' : 'U',
// 	'J' : 'Y',
// 	'g' : 'U',
// 	'G' : 'Y',
// 	'f' : 'Ui',
// 	'F' : 'Yi',
// 	'h' : 'Ui',
// 	'H' : 'Yi',
// 	'i' : 'R',
// 	'I' : 'X',
// 	'k' : 'Ri',
// 	'K' : 'Xi',
// 	'e' : 'Li',
// 	'E' : 'X',
// 	'd' : 'L',
// 	'D' : 'Xi',
// 	'm' : 'F',
// 	'M' : 'Z',
// 	'v' : 'F',
// 	'V' : 'Z',
// 	'c' : 'Fi',
// 	'C' : 'Zi',
// 	'n' : 'Fi',
// 	'N' : 'Zi',
// 	's' : 'D',
// 	'S' : 'Yi',
// 	'l' : 'Di',
// 	'L' : 'Y',
// 	'a' : 'B',
// 	'A' : 'Zi',
// 	'z' : 'B',
// 	'Z' : 'Zi',
// 	';' : 'Bi',
// 	':' : 'Z',
// 	'.' : 'Bi',
// 	'>' : 'Z',
// 	'o' : 'M',
// 	'O' : 'X',
// 	'w' : 'Mi',
// 	'W' : 'Xi',
// 	'x' : 'S',
// 	'X' : 'Z',
// 	',' : 'Si',
// 	'<' : 'Zi',
	// 'ArrowLeft': 'Yi',
	// 'ArrowRight': 'Y',
	// 'ArrowUp': 'Xi',
	// 'ArrowDown': 'X',
	// '[': 'Zi',
	// ']': 'Z',
	// 'e': 'E',
	// 'E': 'Ei',
	// 's': 'S',
	// 'S': 'Si',
	// 'm': 'M',
	// 'M': 'Mi',
	// 'x': 'X',
	// 'X': 'Xi',
	// 'y': 'Y',
	// 'Y': 'Yi',
	// 'z': 'Z',
	// 'Z': 'Zi'
// }
export const keyMoves: Record<KeyCode, MoveCode> = {
	'u': 'U',
	'U': 'Ui',
	'd': 'D',
	'D': 'Di',
	'l': 'L',
	'L': 'Li',
	'r': 'R',
	'R': 'Ri',
	'f': 'F',
	'F': 'Fi',
	'b': 'B',
	'B': 'Bi',
	'ArrowLeft': 'Yi',
	'ArrowRight': 'Y',
	'ArrowUp': 'Xi',
	'ArrowDown': 'X',
	'[': 'Zi',
	']': 'Z',
	'e': 'E',
	'E': 'Ei',
	's': 'S',
	'S': 'Si',
	'm': 'M',
	'M': 'Mi',
	'x': 'X',
	'X': 'Xi',
	'y': 'Y',
	'Y': 'Yi',
	'z': 'Z',
	'Z': 'Zi'
}


