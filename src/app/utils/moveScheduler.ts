import { MoveCode } from "./moveCodes";

type ErrorMessage = {
  error: string
}

type InfoMessage = {
  info: string
}

class MoveScheduler {
  #moves: MoveCode[]
  #fns: Record<MoveCode, () => void>
  #onExecute: (moves: MoveCode[]) => void
  #log

  constructor (
    fns: Record<MoveCode, () => void>,
    onExecute: (moves: MoveCode[]) => void,
    log: (message: string) => void
  ) {
    this.#moves = []
    this.#fns = fns
    this.#onExecute = onExecute
    this.#log = log
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
        this.#log(`ⓘ ${(m as ErrorMessage).error}`)
      }
      else {
        this.#moves.push(m as MoveCode)
      }
    })
  }

  execute() {
    this.#moves.forEach(move => this.#fns[move]())
    this.#onExecute(this.#moves)
  }
}

export default MoveScheduler

