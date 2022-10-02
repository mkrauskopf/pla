import { Expression, parse } from '../parser'
import * as T from '../test-support/tokens'

describe('parser', () => {
  it('should parse number expressions', () => {
    const result: Expression = { number: T.number(3) }
    expect(parse([T.number(3)])).toStrictEqual(result)
  })

  it('should parse computation expressions', () => {
    expect(parse([T.number(3), T.plus(), T.number(8)])).toStrictEqual({
      operator: T.plus(),
      leftOperand: T.number(3),
      rightOperand: T.number(8),
    })
  })

  it('should not parse other than three-tokens computations', () => {
    expect(() => parse([T.number(3), T.plus(), T.number(8), T.plus(), T.number(2)])).toThrow(
      'Unexpected token type: PLUS. Expecting end of expression'
    )
    expect(() => parse([T.number(3), T.plus(), T.number(8), T.number(2)])).toThrow(
      'Unexpected token type: NUMBER(2). Expecting end of expression'
    )
  })

  it('should not parse empty expressions', () => {
    expect(() => parse([])).toThrow('Expression cannot be empty')
  })

  it('should not parse invalid expressions', () => {
    expect(() => parse([T.number(3), T.plus()])).toThrow('Unexpected end of line')
    expect(() => parse([T.plus()])).toThrow('Expected number. Got operator: PLUS')
    expect(() => parse([T.number(3), T.plus(), T.plus()])).toThrow('Expected number. Got operator: PLUS')
    expect(() => parse([T.number(3), T.number(7)])).toThrow('Expected operator. Got number: 7')
  })
})
