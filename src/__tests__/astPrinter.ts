import AstPrinter from '../astPrinter'
import { Binary, Expr, Grouping, Literal, Unary } from '../expr'
import { Token } from '../token'
import { TokenType } from '../tokenType'

describe('AstPrinter', () => {
  describe('print', () => {
    it('should print literal', () => {
      const astPrinter = new AstPrinter()
      const expr: Expr = new Literal('simple')
      expect(astPrinter.print(expr)).toBe('simple')
    })

    it('should print binary', () => {
      const astPrinter = new AstPrinter()

      const minus123 = new Unary(new Token(TokenType.MINUS, '-', null, 1), new Literal(123))
      const times = new Token(TokenType.STAR, '*', null, 1)
      const parenthesized46 = new Grouping(new Literal(45.67))

      const expr: Expr = new Binary(minus123, times, parenthesized46)
      expect(astPrinter.print(expr)).toBe('(* (- 123) (group 45.67))')
    })
  })
})
