import { promisify } from 'util'
import { exec } from 'child_process'

const runCommand = promisify(exec)

const removeLastNewline = (str: string): string =>
	str.replace(/\n$/, '')

const system = (command: string): Promise<string> =>
	runCommand(command).then(({ stdout }) =>
		removeLastNewline(stdout)
	).catch((error: any) =>
		Promise.reject(removeLastNewline(error.stderr))
	)

system.listFiles = system.ls = (directory: string = '.', options: { pattern?: string | RegExp, extension?: string } = {}): Promise<string[]> =>
	system(`find ${directory} -maxdepth 1 ${options.extension === undefined ? '-type f' : `-name '*.${options.extension}'`}`).then(output =>
		output.split('\n').map(file =>
			file.split('/').pop() || ''
		).filter(file =>
			options.pattern
				? file.match(options.pattern)
				: file
		)
	)

module.exports = system