import { scanTokens } from '../scanner'
import * as T from '../test-support/tokens'

describe('scanner', () => {
  it('should scan proper number of tokens', () => {
    expect(scanTokens('1 + 1')).toHaveLength(3)
    expect(scanTokens('1 +    1')).toHaveLength(3)
  })

  it('should scan proper tokens', () => {
    expect(scanTokens('1 + 3')).toStrictEqual([T.number(1), T.plus(), T.number(3)])
    expect(scanTokens('10 / 3')).toStrictEqual([T.number(10), T.divide(), T.number(3)])
    expect(scanTokens('10 * 3 - 1.82')).toStrictEqual([
      T.number(10),
      T.multiply(),
      T.number(3),
      T.minus(),
      T.number(1.82),
    ])
  })

  it('should fail with invalid source', () => {
    expect(() => scanTokens(' a')).toThrowError('Unknown symbol: a')
    expect(() => scanTokens('1 + what?')).toThrowError('Unknown symbol: what?')
  })

  it('should scan float tokens', () => {
    expect(scanTokens('1.2 + 3 - 4.6')).toStrictEqual([T.number(1.2), T.plus(), T.number(3), T.minus(), T.number(4.6)])
  })

  it('should fail to scan an empty string', () => {
    expect(() => scanTokens('')).toThrowError('Cannot evaluate empty expression')
    expect(() => scanTokens(' ')).toThrowError('Cannot evaluate empty expression')
  })
})
