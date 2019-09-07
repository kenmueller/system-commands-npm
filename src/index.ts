import { promisify } from 'util'
import { exec } from 'child_process'
import { join } from 'path'
import * as escapeStringRegexp from 'escape-string-regexp'

const runCommand = promisify(exec)

const removeLastNewline = (str: string): string =>
	str.replace(/\n$/, '')

const system = (command: string): Promise<string> =>
	runCommand(command).then(({ stdout }) =>
		removeLastNewline(stdout)
	).catch((error: any) =>
		Promise.reject(removeLastNewline(error.stderr))
	)

system.listFiles = system.ls = system.find = (directory: string = '.', options: { pattern?: string | RegExp, extension?: string } = {}): Promise<string[]> =>
	system(`find ${directory || '.'} -maxdepth 1 ${options.extension === undefined ? '-type f' : `-name '*.${options.extension}'`}`).then(output =>
		output.split('\n').map(file =>
			file.split('/').pop() || ''
		).filter(file =>
			options.pattern
				? file.match(options.pattern)
				: file
		)
	)

system.listFilesRecursive = system.lsr = system.findr = (directory: string = '.', options: { pattern?: string | RegExp, extension?: string, exclude?: string[], depth?: number } = {}): Promise<string[]> =>
	system(`find ${directory || '.'}${options.depth === undefined || options.depth < 0 ? '' : ` -maxdepth ${options.depth}`}${(options.exclude || []).length ? ` ${(options.exclude || []).map(folder => `-not \\( -path ${join(directory || '.', folder)} -prune \\)`).join(' ')}` : ''} ${options.extension === undefined ? '-type f' : `-name '*.${options.extension}'`}`).then(output =>
		output.split('\n').map(file => {
			const matchArray = file.match(new RegExp(`${escapeStringRegexp(directory)}/(.*)$`))
			return matchArray ? matchArray[1] : ''
		}).filter(file =>
			options.pattern
				? (file.split('/').pop() || file).match(options.pattern)
				: file
		)
	)

module.exports = system