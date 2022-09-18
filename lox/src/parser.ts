import { Expr } from './expr'
import { Lox } from './lox'
import { checkState } from './preconditions'
import { Stmt } from './stmt'
import { Token } from './token'
import { TokenType } from './tokenType'
class Parser {
  private current: number = 0

  constructor(readonly tokens: Readonly<Token[]>) {}

  parse(): Stmt[] {
    const statements: Stmt[] = []
    while (!this.isAtEnd()) {
      statements.push(this.statement())
    }
    return statements
  }

  private statement(): Stmt {
    if (this.match(TokenType.PRINT)) {
      return this.printStatement()
    } else {
      return this.expressionStatement()
    }
  }

  private printStatement(): Stmt {
    const expr = this.expression()
    this.consume(TokenType.SEMICOLON, "Expect ';' after value.")
    return new Stmt.Print(expr)
  }

  private expressionStatement(): Stmt {
    const expr = this.expression()
    this.consume(TokenType.SEMICOLON, "Expect ';' after expression.")
    return new Stmt.Expression(expr)
  }

  private expression(): Expr {
    return this.equality()
  }

  private equality(): Expr {
    let expr = this.comparison()
    while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      const operator = this.previous()
      const right = this.comparison()
      expr = new Expr.Binary(expr, operator, right)
    }
    return expr
  }

  private comparison(): Expr {
    let expr = this.term()
    while (this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
      const operator = this.previous()
      const right = this.term()
      expr = new Expr.Binary(expr, operator, right)
    }
    return expr
  }

  private term(): Expr {
    let expr = this.factor()
    while (this.match(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this.previous()
      const right = this.factor()
      expr = new Expr.Binary(expr, operator, right)
    }
    return expr
  }

  private factor(): Expr {
    let expr = this.unary()
    while (this.match(TokenType.SLASH, TokenType.STAR)) {
      const operator = this.previous()
      const right = this.unary()
      expr = new Expr.Binary(expr, operator, right)
    }
    return expr
  }

  private unary(): Expr {
    if (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator = this.previous()
      const right = this.unary()
      return new Expr.Unary(operator, right)
    }
    return this.primary()
  }

  private primary(): Expr {
    if (this.match(TokenType.FALSE)) {
      return new Expr.Literal(false)
    }
    if (this.match(TokenType.TRUE)) {
      return new Expr.Literal(true)
    }
    if (this.match(TokenType.NIL)) {
      return new Expr.Literal(null)
    }

    if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return new Expr.Literal(this.previous().literal)
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression()
      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression")
      return new Expr.Grouping(expr)
    }

    throw Parser.error(this.peek(), 'Expected expression')
  }

  private synchronize(): void {
    this.advance()

    while (!this.isAtEnd()) {
      switch (this.peek().type) {
        case TokenType.CLASS:
        case TokenType.FUN:
        case TokenType.VAR:
        case TokenType.FOR:
        case TokenType.IF:
        case TokenType.WHILE:
        case TokenType.PRINT:
        case TokenType.RETURN:
          return
      }
      this.advance()
    }
  }

  private match(...types: TokenType[]): boolean {
    return types.some((type) => {
      if (this.check(type)) {
        this.advance()
        return true
      }
      return false
    })
  }

  private consume(type: TokenType, errorMessage: string): Token {
    if (this.check(type)) {
      return this.advance()
    }
    throw Parser.error(this.peek(), errorMessage)
  }

  private check(type: TokenType): boolean {
    return this.isAtEnd() ? false : this.peek().type === type
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++
      checkState(
        this.current < this.tokens.length,
        `current: ${this.current}, nOfTokens: ${this.tokens.length}. Missing EOF token?`
      )
    }
    return this.previous()
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF
  }

  private peek(): Token {
    return this.tokens[this.current]
  }

  private previous(): Token {
    return this.tokens[this.current - 1]
  }

  private static error(token: Token, message: string): ParseError {
    Lox.tokenError(token, message)
    return new ParseError()
  }
}

class ParseError extends Error {}

export { Parser }
