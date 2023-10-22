import { MoveCode } from "../utils/moveCodes";

export type ErrorMessage = {
  error: string
}

export type InfoMessage = {
  info: string
}

class SpinScheduler {
  #moves: MoveCode[]
  #fns
  #onExecute
  #log
  #rotationTime

  constructor (
    fns: Record<MoveCode, (time: number) => void>,
    onExecute: (moves: MoveCode[]) => void,
    log: (message: string) => void,
    rotationTime: number
  ) {
    this.#moves = []
    this.#fns = fns
    this.#onExecute = onExecute
    this.#log = log
    this.#rotationTime = rotationTime
  }

  queue(...moves: (MoveCode | ErrorMessage | InfoMessage | undefined)[]) {
    moves.forEach(m => {
      if(!m) {
        return
      }
      if((m as ErrorMessage).error) {
        this.#log(`⚠ ${(m as ErrorMessage).error}`)
      }
      if((m as InfoMessage).info) {
        this.#log(`ⓘ ${(m as InfoMessage).info}`)
      }
      else {
        this.#moves.push(m as MoveCode)
      }
    })
  }

  execute() {
    this.#moves.forEach(move => this.#fns[move](this.#rotationTime))
    this.#onExecute(this.#moves)
  }
}

export default SpinScheduler

