import { Expression, NumberExpression, parse } from './parser'
import { TokenType, scanTokens } from './scanner'

function evaluate(expression: string): string {
  const ast = parse(scanTokens(expression))
  if (isNumberExpression(ast)) {
    return ast.number.lexem
  } else {
    // is ComputationExpression
    const left = Number(ast.leftOperand.lexem)
    const right = Number(ast.rightOperand.lexem)
    switch (ast.operator.type) {
      case TokenType.Plus:
        return String(left + right)
      case TokenType.Minus:
        return String(left - right)
      case TokenType.Multiply:
        return String(left * right)
      case TokenType.Divide:
        return String(left / right)
    }
  }
}

function isNumberExpression(ast: Expression): ast is NumberExpression {
  return (ast as NumberExpression).number !== undefined
}

export { evaluate }
