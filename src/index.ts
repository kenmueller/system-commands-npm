import { promisify } from 'util'
import { exec } from 'child_process'

const runCommand = promisify(exec)

const removeLastNewline = (str: string): string =>
	str.replace(/\n$/, '')

module.exports = (command: string): Promise<string> =>
	runCommand(command).then(({ stdout, stderr }) =>
		stderr
			? Promise.reject(stderr)
			: Promise.resolve(removeLastNewline(stdout))
	).catch((error: any) =>
		removeLastNewline(error.stderr || error)
	)