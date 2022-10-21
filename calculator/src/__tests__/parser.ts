import { Expression, parse } from '../parser'
import * as T from '../test-support/tokens'

describe('parser', () => {
  it('should parse single number expressions', () => {
    expect(parse([T.number(3)])).toStrictEqual(T.number(3))
  })

  it('should parse expression with two terms', () => {
    const expression = {
      operator: T.plus(),
      leftTerm: T.number(3),
      rightTerm: T.number(8),
    }
    expect(parse([T.number(3), T.plus(), T.number(8)])).toStrictEqual(expression)
  })

  it('should parse expression with three terms', () => {
    expect(parse([T.number(1), T.plus(), T.number(2), T.minus(), T.number(3)])).toStrictEqual({
      leftTerm: {
        leftTerm: T.number(1),
        operator: T.plus(),
        rightTerm: T.number(2),
      },
      operator: T.minus(),
      rightTerm: T.number(3),
    })

    expect(parse([T.number(1), T.minus(), T.number(2), T.plus(), T.number(3)])).toStrictEqual({
      leftTerm: {
        leftTerm: T.number(1),
        operator: T.minus(),
        rightTerm: T.number(2),
      },
      operator: T.plus(),
      rightTerm: T.number(3),
    })
  })

  it('should parse term with two factors', () => {
    const expression: Expression = {
      operator: T.multiply(),
      leftFactor: T.number(3),
      rightFactor: T.number(8),
    }
    expect(parse([T.number(3), T.multiply(), T.number(8)])).toStrictEqual(expression)
  })

  it('should parse term with more than two factors', () => {
    const expression: Expression = {
      leftFactor: {
        leftFactor: T.number(3),
        operator: T.multiply(),
        rightFactor: T.number(8),
      },
      operator: T.divide(),
      rightFactor: T.number(2),
    }
    expect(parse([T.number(3), T.multiply(), T.number(8), T.divide(), T.number(2)])).toStrictEqual(expression)
  })

  it('should parse expression with two terms', () => {
    expect(parse([T.number(3), T.plus(), T.number(8)])).toStrictEqual({
      leftTerm: T.number(3),
      operator: T.plus(),
      rightTerm: T.number(8),
    })
  })

  it('should parse complex expressions with terms and factors', () => {
    expect(parse([T.number(1), T.plus(), T.number(2), T.multiply(), T.number(3)])).toStrictEqual({
      leftTerm: T.number(1),
      operator: { type: 'PLUS' },
      rightTerm: {
        leftFactor: T.number(2),
        operator: { type: 'MULTIPLY' },
        rightFactor: T.number(3),
      },
    })

    expect(parse([T.number(1), T.multiply(), T.number(2), T.plus(), T.number(3)])).toStrictEqual({
      leftTerm: {
        leftFactor: T.number(1),
        operator: { type: 'MULTIPLY' },
        rightFactor: T.number(2),
      },
      operator: { type: 'PLUS' },
      rightTerm: T.number(3),
    })

    // 1 - 2 + 3 * 4 = 11
    expect(
      parse([T.number(1), T.minus(), T.number(2), T.plus(), T.number(3), T.multiply(), T.number(4)])
    ).toStrictEqual({
      leftTerm: {
        leftTerm: T.number(1),
        operator: { type: 'MINUS' },
        rightTerm: T.number(2),
      },
      operator: { type: 'PLUS' },
      rightTerm: {
        leftFactor: T.number(3),
        operator: { type: 'MULTIPLY' },
        rightFactor: T.number(4),
      },
    })
  })

  describe('errorneous states', () => {
    it('should not parse empty expressions', () => {
      expect(() => parse([])).toThrow('Expression cannot be empty')
    })

    it('should not parse invalid expressions', () => {
      expect(() => parse([T.number(3), T.plus()])).toThrow('Unexpected end of expression')
      expect(() => parse([T.number(3), T.multiply()])).toThrow('Unexpected end of expression')
      expect(() => parse([T.plus()])).toThrow('Expected number. Got operator: PLUS')
      expect(() => parse([T.number(3), T.plus(), T.plus()])).toThrow('Expected number. Got operator: PLUS')
      expect(() => parse([T.number(3), T.number(7)])).toThrow('Unexpected token: type: NUMBER(7)')
      expect(() => parse([T.number(3), T.divide(), T.number(8), T.number(2)])).toThrow(
        'Unexpected token: type: NUMBER(2)'
      )
      expect(() => parse([T.number(3), T.plus(), T.number(8), T.number(2)])).toThrow(
        'Unexpected token: type: NUMBER(2)'
      )
    })
  })
})
