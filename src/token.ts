import { TokenType } from './tokenType'

export class Token {
  constructor(
    private readonly type: TokenType,
    private readonly lexeme: string,
    private readonly literal: null | string,
    private readonly line: number
  ) {}

  toString(): string {
    return this.type + ' ' + this.lexeme + ' ' + this.literal
  }
}
