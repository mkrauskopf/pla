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
      case '!':
        this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG)
        break
      case '=':
        this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL)
        break
      case '<':
        this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS)
        break
      case '>':
        this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER)
        break
      case '/':
        if (this.match('/')) {
          // The comment lexeme: goes until the end of the line.
          while (this.peek() != '\n' && !this.isAtEnd()) this.advance()
        } else {
          this.addToken(TokenType.SLASH)
        }
        break
      case ' ':
      case '\r':
      case '\t':
        // Ignore whitespace.
        break
      case '\n':
        this.line++
        break
      case '"':
        this.string()
        break
      default:
        if (Scanner.isDigit(c)) {
          this.number()
        } else {
          Lox.error(this.line, `Unexpected character: '${c}'`)
        }
        break
    }
  }

  private addToken(type: TokenType, literal: null | string | number = null): void {
    const lexeme = this.source.substring(this.start, this.current)
    this.tokens.push(new Token(type, lexeme, literal, this.line))
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length
  }

  private advance(): string {
    return this.source.charAt(this.current++)
  }

  private peek(): string {
    return this.isAtEnd() ? '\0' : this.source.charAt(this.current)
  }

  private peekNext(): string {
    return this.current + 1 >= this.source.length ? '\0' : this.source.charAt(this.current + 1)
  }

  private match(expected: string): boolean {
    if (this.peek() !== expected) {
      return false
    }
    this.current++
    return true
  }

  private static isDigit(c: string): boolean {
    return c >= '0' && c <= '9'
  }

  private string(): void {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') {
        this.line++
      }
      this.advance()
    }
    if (this.isAtEnd()) {
      Lox.error(this.line, 'Unterminated string.')
      return
    }
    this.advance()

    const value = this.source.substring(this.start + 1, this.current - 1)
    this.addToken(TokenType.STRING, value)
  }

  private number(): void {
    while (Scanner.isDigit(this.peek())) {
      this.advance()
    }

    if (this.peek() === '.' && Scanner.isDigit(this.peekNext())) {
      this.advance()
      while (Scanner.isDigit(this.peek())) {
        this.advance()
      }
    }
    this.addToken(TokenType.NUMBER, Number(this.source.substring(this.start, this.current)))
  }
}
