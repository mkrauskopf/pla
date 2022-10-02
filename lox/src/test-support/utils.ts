const mockConsole = () => jest.spyOn(console, 'error').mockImplementation(() => ({}))

export { mockConsole }
