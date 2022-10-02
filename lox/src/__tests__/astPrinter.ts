import AstPrinter from '../astPrinter'
import { Expr, Grouping, Unary } from '../expr'
import { binary, literal, minusToken, starToken } from '../test-support/tokens'

describe('AstPrinter', () => {
  describe('print', () => {
    it('should print literal', () => {
      const astPrinter = new AstPrinter()
      const expr: Expr = literal('simple')
      expect(astPrinter.print(expr)).toBe('simple')
    })

    it('should print binary', () => {
      const astPrinter = new AstPrinter()

      const minus123 = new Unary(minusToken(), literal(123))
      const parenthesized46 = new Grouping(literal(45.67))

      const expr: Expr = binary(minus123, starToken(), parenthesized46)
      expect(astPrinter.print(expr)).toBe('(* (- 123) (group 45.67))')
    })
  })
})
