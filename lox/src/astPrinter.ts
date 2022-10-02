import { Binary, Expr, Grouping, Literal, Unary, Visitor } from './expr'

class AstPrinter implements Visitor<string> {
  print(expr: Expr): string {
    return expr.accept(this)
  }

  visitBinaryExpr(expr: Binary): string {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right)
  }

  visitGroupingExpr(expr: Grouping): string {
    return this.parenthesize('group', expr.expr)
  }

  visitLiteralExpr(expr: Literal): string {
    return expr.value == null ? 'nil' : String(expr.value)
  }

  visitUnaryExpr(expr: Unary): string {
    return this.parenthesize(expr.operator.lexeme, expr.right)
  }

  private parenthesize(name: string, ...rest: Expr[]): string {
    const restPrinted = rest.map((expr) => ` ${expr.accept(this)}`).join('')
    return `(${name}${restPrinted})`
  }
}

export default AstPrinter
