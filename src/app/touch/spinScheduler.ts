// import { MoveCode } from "@/app/utils/moveCodes";
// import { CubeGrid } from "../store/cubeSlice";
// import { AppStore } from "../store/useAppStore";

// export type ErrorMessage = {
//   error: string
// }

// export type InfoMessage = {
//   info: string
// }

// class SpinScheduler {
//   #moves: MoveCode[]
//   #fns
//   #onExecute
//   #log  
//   #rotationTime

//   constructor (
//     fns: Record<MoveCode, (cubeGrid: CubeGrid, time: number) => void>,
//     onExecute: (moves: MoveCode[]) => void,
//     log: (message: string) => void,
//     rotationTime: number
//   ) {
//     this.#moves = []
//     this.#fns = fns
//     this.#onExecute = onExecute
//     this.#log = log
//     this.#rotationTime = rotationTime
//   }

//   queue(...moves: (MoveCode | ErrorMessage | InfoMessage | undefined)[]) {
//     moves.forEach(m => {
//       if(!m) {
//         return
//       }
//       if((m as ErrorMessage).error) {
//         this.#log(`⚠ ${(m as ErrorMessage).error}`)
//       }
//       if((m as InfoMessage).info) {
//         this.#log(`ⓘ ${(m as InfoMessage).info}`)
//       }
//       else {
//         this.#moves.push(m as MoveCode)
//       }
//     })
//   }

//   execute() {
//     const state = this.
//     this.#moves.forEach(move => this.#fns[move](this.#rotationTime))
//     this.#onExecute(this.#moves)
//   }
// }

// export default SpinScheduler

