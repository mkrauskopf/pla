import { Lox } from './lox'
import { Token } from './token'
import { TokenType } from './tokenType'

export class Scanner {
  private readonly tokens: Token[] = []
  private start: number = 0
  private current: number = 0
  private line: number = 1

  constructor(private readonly source: string) {}

  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current
      this.scanToken()
    }

    this.tokens.push(new Token(TokenType.EOF, '', null, this.line))
    return this.tokens
  }

  private scanToken(): void {
    const c = this.advance()
    switch (c) {
      case '(':
        this.addToken(TokenType.LEFT_PAREN)
        break
      case ')':
        this.addToken(TokenType.RIGHT_PAREN)
        break
      case '{':
        this.addToken(TokenType.LEFT_BRACE)
        break
      case '}':
        this.addToken(TokenType.RIGHT_BRACE)
        break
      case ',':
        this.addToken(TokenType.COMMA)
        break
      case '.':
        this.addToken(TokenType.DOT)
        break
      case '-':
        this.addToken(TokenType.MINUS)
        break
      case '+':
        this.addToken(TokenType.PLUS)
        break
      case ';':
        this.addToken(TokenType.SEMICOLON)
        break
      case '*':
        this.addToken(TokenType.STAR)
        break
      default:
        Lox.error(this.line, 'Unexpected character.')
        break
    }
  }

  private addToken(type: TokenType, literal: null | object = null): void {
    const text = this.source.substring(this.start, this.current)
    this.tokens.push(new Token(type, text, literal, this.line))
  }

  private advance(): string {
    return this.source.charAt(this.current++)
  }

  private isAtEnd(): boolean {
    return this.current > this.source.length
  }
}
