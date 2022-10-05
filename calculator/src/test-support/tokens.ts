import { NumberToken, OperatorToken, TokenType } from '../scanner'

const number = (n: number): NumberToken => ({ type: TokenType.Number, literal: n })
const plus = (): OperatorToken => ({ type: TokenType.Plus })
const minus = (): OperatorToken => ({ type: TokenType.Minus })
const multiply = (): OperatorToken => ({ type: TokenType.Multiply })
const divide = (): OperatorToken => ({ type: TokenType.Divide })

export { number, plus, minus, multiply, divide }
