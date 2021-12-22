function checkState(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message)
  }
}

export { checkState }
