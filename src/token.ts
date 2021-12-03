import { TokenType } from './tokenType'
import type { Literal } from './types'

export class Token {
  constructor(
    private readonly type: TokenType,
    readonly lexeme: string,
    private readonly literal: Literal,
    private readonly line: number
  ) {}

  toString(): string {
    return this.type + ' ' + this.lexeme + ' ' + this.literal
  }
}
