import { Lox } from './lox'

function checkState(condition: boolean, message: string) {
  if (!condition) {
    Lox.hadError = true
    throw new Error(message)
  }
}

export { checkState }
