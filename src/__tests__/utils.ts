// Prevent Jest complaining.
test.skip('skip', () => {})

// Tools
const mockConsole = () => jest.spyOn(console, 'error').mockImplementation(() => {})

export { mockConsole }
