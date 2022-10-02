import { TokenType } from './tokenType'
import type { Literal } from './types'

export class Token {
  constructor(readonly type: TokenType, readonly lexeme: string, readonly literal: Literal, readonly line: number) {}

  toString(): string {
    return this.type + ' ' + this.lexeme + ' ' + this.literal
  }
}
