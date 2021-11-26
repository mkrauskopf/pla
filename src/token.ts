import { TokenType } from './tokenType.js'

export class Token {
  constructor(
    private readonly type: TokenType,
    private readonly lexeme: string,
    private readonly literal: null | object,
    private readonly line: number
  ) {}

  toString(): string {
    return this.type + ' ' + this.lexeme + ' ' + this.literal
  }
}
