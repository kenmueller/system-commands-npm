import { promisify } from 'util'
import { exec } from 'child_process'

const runCommand = promisify(exec)

module.exports = (command: string): Promise<string> =>
	runCommand(command).then(({ stdout, stderr }) =>
		stderr ? Promise.reject(stderr) : stdout
	)