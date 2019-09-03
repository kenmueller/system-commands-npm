import { promisify } from 'util'
import { exec } from 'child_process'

const runCommand = promisify(exec)

const removeLastNewline = (str: string): string =>
	str.replace(/\n$/, '')

module.exports = (command: string): Promise<string> =>
	runCommand(command).then(({ stdout }) =>
		removeLastNewline(stdout)
	).catch((error: any) =>
		Promise.reject(removeLastNewline(error.stderr))
	)