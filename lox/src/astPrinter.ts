import { Expr } from './expr'
import { Stmt } from './stmt'

class AstPrinter implements Stmt.Visitor, Expr.Visitor<string> {
  print(statements: Stmt[]): string {
    statements.forEach((statement) => {
      statement.accept(this)
    })
    return 'Statements Not Implemented yet'
  }

  visitPrintStatement(statement: Stmt): void {
    throw new Error('Method not implemented.')
  }
  visitExpressionStatement(statement: Stmt): void {
    throw new Error('Method not implemented.')
  }

  visitBinaryExpr(expr: Expr.Binary): string {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right)
  }

  visitGroupingExpr(expr: Expr.Grouping): string {
    return this.parenthesize('group', expr.expr)
  }

  visitLiteralExpr(expr: Expr.Literal): string {
    return expr.value == null ? 'nil' : String(expr.value)
  }

  visitUnaryExpr(expr: Expr.Unary): string {
    return this.parenthesize(expr.operator.lexeme, expr.right)
  }

  private parenthesize(name: string, ...rest: Expr[]): string {
    const restPrinted = rest.map((expr) => ` ${expr.accept(this)}`).join('')
    return `(${name}${restPrinted})`
  }
}

export default AstPrinter
