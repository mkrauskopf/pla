import { Expr } from '../expr'
import Interpreter, { LoxValue } from '../interpreter'
import * as T from '../types'
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
} from './tokens'

const l8 = literal(8)
const l2 = literal(2)

const interpretExpr = (expr: Expr): LoxValue => expr.accept(new Interpreter())

describe('Interpreter', () => {
  it('should interpret literal', () => {
    expect(interpretExpr(literal(42))).toBe(42)
  })

  it('should interpret arithmetics', () => {
    expect(interpretExpr(binary(l8, minusToken(), l2))).toBe(6)
    expect(interpretExpr(binary(l8, plusToken(), l2))).toBe(10)
    expect(interpretExpr(binary(l8, starToken(), l2))).toBe(16)
    expect(interpretExpr(binary(l8, slashToken(), l2))).toBe(4)
  })

  it('should interpret comparison', () => {
    expect(interpretExpr(binary(l8, greaterToken(), l2))).toBe(true)
    expect(interpretExpr(binary(l8, greaterEqualToken(), l8))).toBe(true)
    expect(interpretExpr(binary(l8, lessToken(), l2))).toBe(false)
    expect(interpretExpr(binary(l8, lessEqualToken(), l8))).toBe(true)
  })

  it('should interpret concatenation', () => {
    expect(interpretExpr(binary(literal('Hello'), plusToken(), literal(' World')))).toBe('Hello World')
  })

  it('should not interpret invalid plus', () => {
    expect(interpretExpr(binary(literal(1), plusToken(), literal('abc')))).toBe(null)
  })

  it('should interpret arithmetic', () => {
    expect(interpretExpr(new Expr.Unary(minusToken(), l8))).toBe(-8)
  })

  it('should interpret negation', () => {
    const interpretNegation = (expr: T.Literal) => interpretExpr(new Expr.Unary(bangToken(), literal(expr)))
    expect(interpretNegation(false)).toBe(true)
    expect(interpretNegation(null)).toBe(true)
    expect(interpretNegation(true)).toBe(false)
    expect(interpretNegation('')).toBe(false)
    expect(interpretNegation('0')).toBe(false)
    expect(interpretNegation('false')).toBe(false)
  })

  it('should interpret grouping', () => {
    expect(interpretExpr(new Expr.Grouping(l2))).toBe(2)
  })
})
