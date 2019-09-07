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

it('lists files ending in js', async done => {
	try {
		const files = await system.listFiles(__dirname, { extension: 'js' })
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

it('lists files recursively', async done => {
	try {
		const files = await system.listFilesRecursive(__dirname, { extension: 'js' })
		expect(files).toStrictEqual(['folder/hi.js', 'index.test.js'])
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})

it('excludes files from list recursive', async done => {
	try {
		const files = await system.listFilesRecursive(__dirname, { extension: 'js', exclude: ['folder'] })
		expect(files).toStrictEqual(['index.test.js'])
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})

it('matches filenames from list recursive', async done => {
	try {
		const files = await system.listFilesRecursive(__dirname, { extension: 'js', pattern: /test/ })
		expect(files).toStrictEqual(['index.test.js'])
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})

it('handles depth in list recursive', async done => {
	try {
		const files = await system.listFilesRecursive(__dirname, { extension: 'js', depth: 1 })
		expect(files).toStrictEqual(['index.test.js'])
		done()
	} catch (error) {
		done.fail(`.catch statement was called: ${error}`)
	}
})