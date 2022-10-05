import { evaluate } from '../interpreter'

describe('interpreter', () => {
  it('should interpret valid numbers', () => {
    expect(evaluate('2')).toBe(2)
    expect(evaluate('-2')).toBe(-2)
    expect(evaluate('+2')).toBe(2)
  })

  it('should interpret valid computations', () => {
    expect(evaluate('2 * 3')).toBe(6)
    expect(evaluate('2 + 3')).toBe(5)
    expect(evaluate('2 - 3')).toBe(-1)
    expect(evaluate('6 / 3')).toBe(2)
    expect(evaluate('2 - -3')).toBe(5)
    expect(evaluate('2 - +3')).toBe(-1)
  })

  it('should not interpret invalid expresssions', () => {
    expect(() => evaluate('')).toThrow('Cannot evaluate empty expression')
    expect(() => evaluate('+')).toThrow('Expected number. Got operator: PLUS')
  })
})
