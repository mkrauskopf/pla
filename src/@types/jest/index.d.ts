import { Token } from '../../token'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTokenizedTo(expected: Token[]): R
    }
  }
}

export {}
