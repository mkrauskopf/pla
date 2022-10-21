import { NumberToken, TokenType } from '../scanner'

const number = (n: number): NumberToken => ({ type: TokenType.Number, literal: n })
const plus = (): { type: TokenType.Plus } => ({ type: TokenType.Plus })
const minus = (): { type: TokenType.Minus } => ({ type: TokenType.Minus })
const multiply = (): { type: TokenType.Multiply } => ({ type: TokenType.Multiply })
const divide = (): { type: TokenType.Divide } => ({ type: TokenType.Divide })

export { number, plus, minus, multiply, divide }
