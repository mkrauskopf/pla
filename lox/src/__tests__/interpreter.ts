import { Expr, Grouping, Unary } from '../expr'
import Interpreter, { LoxValue } from '../interpreter'
import {
  bangToken,
  binary,
  greaterEqualToken,
  greaterToken,
  lessEqualToken,
  lessToken,
  literal,
  minusToken,
  plusToken,
  slashToken,
  starToken,
} from '../test-support/tokens'
import * as T from '../types'

const l8 = literal(8)
const l2 = literal(2)

describe('Interpreter', () => {
  it('should interpret literal', () => {
    expect(interpret(literal(42))).toBe(42)
  })

  it('should interpret arithmetics', () => {
    expect(interpret(binary(l8, minusToken(), l2))).toBe(6)
    expect(interpret(binary(l8, plusToken(), l2))).toBe(10)
    expect(interpret(binary(l8, starToken(), l2))).toBe(16)
    expect(interpret(binary(l8, slashToken(), l2))).toBe(4)
  })

  it('should interpret comparison', () => {
    expect(interpret(binary(l8, greaterToken(), l2))).toBe(true)
    expect(interpret(binary(l8, greaterEqualToken(), l8))).toBe(true)
    expect(interpret(binary(l8, lessToken(), l2))).toBe(false)
    expect(interpret(binary(l8, lessEqualToken(), l8))).toBe(true)
  })

  it('should interpret concatenation', () => {
    expect(interpret(binary(literal('Hello'), plusToken(), literal(' World')))).toBe('Hello World')
  })

  it('should not interpret invalid plus', () => {
    expect(interpret(binary(literal(1), plusToken(), literal('abc')))).toBe(null)
  })

  it('should interpret arithmetic', () => {
    expect(interpret(new Unary(minusToken(), l8))).toBe(-8)
  })

  it('should interpret negation', () => {
    const interpretNegation = (expr: T.Literal) => interpret(new Unary(bangToken(), literal(expr)))
    expect(interpretNegation(false)).toBe(true)
    expect(interpretNegation(null)).toBe(true)
    expect(interpretNegation(true)).toBe(false)
    expect(interpretNegation('')).toBe(false)
    expect(interpretNegation('0')).toBe(false)
    expect(interpretNegation('false')).toBe(false)
  })

  it('should interpret grouping', () => {
    expect(interpret(new Grouping(l2))).toBe(2)
  })
})

function interpret(expr: Expr): LoxValue {
  return expr.accept(new Interpreter())
}
