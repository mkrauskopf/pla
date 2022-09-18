import { Expr } from './expr'
import { Lox } from './lox'
import { Stmt } from './stmt'
import { TokenType } from './tokenType'
import type * as T from './types'

type LoxValue = Readonly<T.Literal | null>

class Interpreter implements Expr.Visitor<LoxValue>, Stmt.Visitor {
  interpret(statements: Stmt[]): void {
    try {
      statements.forEach((statement) => {
        this.execute(statement)
      })
    } catch (error) {
      Lox.hadError = true
      console.log('MK: error\n', error)
    }
  }

  execute(statement: Stmt) {
    statement.accept(this)
  }

  visitExpressionStatement(stmt: Stmt.Expression): void {
    this.evaluate(stmt.expression)
  }

  visitPrintStatement(stmt: Stmt.Print): void {
    const value = this.evaluate(stmt.expression)
    console.log(value)
  }

  visitBinaryExpr(binary: Expr.Binary): LoxValue {
    const left = this.evaluate(binary.left)
    const right = this.evaluate(binary.right)

    switch (binary.operator.type) {
      case TokenType.GREATER:
        return Number(left) > Number(right)
      case TokenType.GREATER_EQUAL:
        return Number(left) >= Number(right)
      case TokenType.LESS:
        return Number(left) < Number(right)
      case TokenType.LESS_EQUAL:
        return Number(left) <= Number(right)

      case TokenType.EQUAL:
        return this.isEqual(left, right)
      case TokenType.BANG_EQUAL:
        return !this.isEqual(left, right)

      case TokenType.MINUS:
        return Number(left) - Number(right)
      case TokenType.PLUS:
        if (typeof left === 'number' && typeof right === 'number') {
          return Number(left) + Number(right)
        } else if (typeof left === 'string' && typeof right === 'string') {
          return String(left) + String(right)
        }
        break
      case TokenType.SLASH:
        return Number(left) / Number(right)
      case TokenType.STAR:
        return Number(left) * Number(right)
    }

    return null
  }

  visitGroupingExpr(grouping: Expr.Grouping): LoxValue {
    return this.evaluate(grouping.expr)
  }

  visitLiteralExpr(literal: Expr.Literal): LoxValue {
    return literal.value
  }

  visitUnaryExpr(unary: Expr.Unary): LoxValue {
    const right = this.evaluate(unary.right)

    switch (unary.operator.type) {
      case TokenType.BANG:
        return !this.isTruthy(right)
      case TokenType.MINUS:
        return -Number(right)
    }

    return null
  }

  private evaluate(expr: Expr): LoxValue {
    return expr.accept(this)
  }

  private isTruthy(value: LoxValue): boolean {
    if (value == null) {
      return false
    }
    if (typeof value === 'boolean') {
      return Boolean(value)
    }
    return true
  }

  private isEqual(left: LoxValue, right: LoxValue): boolean {
    if (left === null && right === null) {
      return true
    }
    if (left === null) {
      return false
    }

    return left === right
  }
}

export default Interpreter
export type { LoxValue }
