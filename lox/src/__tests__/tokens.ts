import { Binary, Expr, Literal } from '../expr'
import { Token } from '../token'
import { TokenType } from '../tokenType'
import * as T from '../types'

// Prevent Jest complaining.
test.skip('skip', () => {})

const eof = (line: number) => new Token(TokenType.EOF, '', null, line)
const EOF_1 = eof(1)

const literal = (value: T.Literal) => new Literal(value)
const numberToken = (n: number) => new Token(TokenType.NUMBER, `${n}`, n, 1)
const binary = (left: Expr, operator: Token, right: Expr) => new Binary(left, operator, right)

const bangToken = () => new Token(TokenType.BANG, '!', null, 1)

const minusToken = () => new Token(TokenType.MINUS, '-', null, 1)
const plusToken = () => new Token(TokenType.PLUS, '+', null, 1)
const starToken = () => new Token(TokenType.STAR, '*', null, 1)
const slashToken = () => new Token(TokenType.SLASH, '/', null, 1)

const greaterToken = () => new Token(TokenType.GREATER, '>', null, 1)
const greaterEqualToken = () => new Token(TokenType.GREATER_EQUAL, '>=', null, 1)
const lessToken = () => new Token(TokenType.LESS, '<', null, 1)
const lessEqualToken = () => new Token(TokenType.LESS_EQUAL, '<=', null, 1)

export {
  eof,
  EOF_1,
  literal,
  numberToken,
  binary,
  bangToken,
  minusToken,
  plusToken,
  starToken,
  slashToken,
  greaterToken,
  greaterEqualToken,
  lessToken,
  lessEqualToken,
}
