const system = require('../lib/index.js')

it('handles errors', async done => {
	try {
		await system('echo \'error\' >& 2 && exit 1')
		done.fail('.catch was not called')
	} catch (error) {
		expect(error).toBe('error')
		done()
	}
})

it('handles no output', async done => {
	try {
		const output = await system('rm -rf \'directory_that_does_not_exist\'')
		expect(output).toBe('')
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})

it('lists files', async done => {
	try {
		const files = await system.listFiles(__dirname)
		expect(files).toStrictEqual(['index.test.js'])
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})

it('lists files ending in test.js', async done => {
	try {
		const files = await system.listFiles(__dirname, { extension: 'test.js' })
		expect(files).toStrictEqual(['index.test.js'])
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})

it('lists no files files ending in ts', async done => {
	try {
		const files = await system.listFiles(__dirname, { extension: 'ts' })
		expect(files).toStrictEqual([])
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})