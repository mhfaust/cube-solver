
export const moveCodes =  [
	'U' , 'U′' , 'D' , 'D′' , 'E' , 'E′' ,
	'R' , 'R′' , 'L' , 'L′' , 'M' , 'M′' ,
	'F' , 'F′' , 'B' , 'B′' , 'S' , 'S′' ,
	'X' , 'X′' , 'Y' , 'Y′' , 'Z' , 'Z′'
] as const

export type MoveCode = typeof moveCodes[number]

const inverseMoves: Record<MoveCode, MoveCode> = { 
  'U':'U′','D':'D′','E':'E′','R':'R′','L':'L′','M':'M′','F':'F′','B':'B′','S':'S′','X':'X′','Y':'Y′','Z':'Z′',
  'U′':'U','D′':'D','E′':'E','R′':'R','L′':'L','M′':'M','F′':'F','B′':'B','S′':'S','X′':'X','Y′':'Y','Z′':'Z',
}
export const inverse = (move: MoveCode) => inverseMoves[move]

export const keyCodes = [
	// 'u', 'U', 'd', 'D', 'e', 'E',
	// 'l', 'L', 'r', 'R', 'm', 'M',
	// 'f', 'F', 'b', 'B', 's', 'S',
	// 'x', 'X', 'y', 'Y', 'z', 'Z',
	// 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '[', ']'
	'j', 
	'J', 
	'g',
	'G',
	'f', 
	'h',
	'i',
	'k',
	'e',
	'd',
	'm', 
	'v',
	'c', 
	'n',
	's',
	'l',
	'a', 
	'z',
	';', 
	'.',
	'o',
	'w',
	'x',
	',',
] as const
export type KeyCode = typeof keyCodes[number]

const ks = new Set(keyCodes)
export const asKeyCode = (s: string): KeyCode | undefined => {
	if(ks.has(s as KeyCode)) {
		return s as KeyCode
	}
	return undefined
}

export const keyMoves: Record<string, MoveCode> = {
	'j' : 'U',
	'J' : 'Y',
	'g' : 'U',
	'G' : 'Y',
	'f' : 'U′',
	'F' : 'Y′',
	'h' : 'U′',
	'H' : 'Y′',
	'i' : 'R',
	'I' : 'X',
	'k' : 'R′',
	'K' : 'X′',
	'e' : 'L′',
	'E' : 'X',
	'd' : 'L',
	'D' : 'X′',
	'm' : 'F',
	'M' : 'Z',
	'v' : 'F',
	'V' : 'Z',
	'c' : 'F′',
	'C' : 'Z′',
	'n' : 'F′',
	'N' : 'Z′',
	's' : 'D',
	'S' : 'Y′',
	'l' : 'D′',
	'L' : 'Y',
	'a' : 'B',
	'A' : 'Z′',
	'z' : 'B',
	'Z' : 'Z′',
	';' : 'B′',
	':' : 'Z',
	'.' : 'B′',
	'>' : 'Z',
	'o' : 'M',
	'O' : 'X',
	'w' : 'M′',
	'W' : 'X′',
	'x' : 'S',
	'X' : 'Z',
	',' : 'S′',
	'<' : 'Z′',
	// 'ArrowLeft': 'Y′',
	// 'ArrowRight': 'Y',
	// 'ArrowUp': 'X′',
	// 'ArrowDown': 'X',
	// '[': 'Z′',
	// ']': 'Z',
	// 'e': 'E',
	// 'E': 'E′',
	// 's': 'S',
	// 'S': 'S′',
	// 'm': 'M',
	// 'M': 'M′',
	// 'x': 'X',
	// 'X': 'X′',
	// 'y': 'Y',
	// 'Y': 'Y′',
	// 'z': 'Z',
	// 'Z': 'Z′'
}
// export const keyMoves: Record<KeyCode, MoveCode> = {
// 	'u': 'U',
// 	'U': 'U′',
// 	'd': 'D',
// 	'D': 'D′',
// 	'l': 'L',
// 	'L': 'L′',
// 	'r': 'R',
// 	'R': 'R′',
// 	'f': 'F',
// 	'F': 'F′',
// 	'b': 'B',
// 	'B': 'B′',
// 	'ArrowLeft': 'Y′',
// 	'ArrowRight': 'Y',
// 	'ArrowUp': 'X′',
// 	'ArrowDown': 'X',
// 	'[': 'Z′',
// 	']': 'Z',
// 	'e': 'E',
// 	'E': 'E′',
// 	's': 'S',
// 	'S': 'S′',
// 	'm': 'M',
// 	'M': 'M′',
// 	'x': 'X',
// 	'X': 'X′',
// 	'y': 'Y',
// 	'Y': 'Y′',
// 	'z': 'Z',
// 	'Z': 'Z′'
// }


