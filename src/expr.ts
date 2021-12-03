import { Token } from './token'
import type * as T from './types'

abstract class Expr {
  abstract accept<R>(visitor: Visitor<R>): R
}

interface Visitor<R> {
  // visitAssignExpr(expr: Assign): R
  visitBinaryExpr(expr: Binary): R
  // visitCallExpr(expr: Call): R
  // visitGetExpr(expr: Get): R
  visitGroupingExpr(expr: Grouping): R
  visitLiteralExpr(expr: Literal): R
  // visitLogicalExpr(expr: Logical): R
  // visitSetExpr(expr: Set): R
  // visitSuperExpr(expr: Super): R
  // visitThisExpr(expr: This): R
  visitUnaryExpr(expr: Unary): R
  // visitVariableExpr(expr: Variable): R
}

class Binary extends Expr {
  constructor(readonly left: Expr, readonly operator: Token, readonly right: Expr) {
    super()
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitBinaryExpr(this)
  }
}

class Grouping extends Expr {
  constructor(readonly expr: Expr) {
    super()
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitGroupingExpr(this)
  }
}

class Literal extends Expr {
  constructor(readonly value: T.Literal) {
    super()
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitLiteralExpr(this)
  }
}

class Unary extends Expr {
  constructor(readonly operator: Token, readonly right: Expr) {
    super()
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitUnaryExpr(this)
  }
}

export { Expr, Visitor, Binary, Grouping, Literal, Unary }
