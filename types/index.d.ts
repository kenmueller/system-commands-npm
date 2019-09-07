declare module 'system-commands' {
	/**
	 * Runs a system command
	 * 
	 * @param command The command you want to run, like `ls` or `mkdir new_directory`
	 * 
	 * @returns A `Promise` containing the output of the command. If the command failed, the error is passed into the `.catch` block.
	 */
	function system(command: string): Promise<string>

	/**
	 * Lists all files in a directory
	 * 
	 * Listing files in the directory of your JavaScript file:
	 * 
	 * ```javascript
	 * system.listFiles(__dirname)
	 * ```
	 * 
	 * @param directory Where you want to list the files. By default, it is set to the current working directory (`.`). Set this parameter to `__dirname` to list all the files in the directory your JavaScript file that is calling this function is in.
	 * @param options.pattern All files listed must have filenames that conform to this pattern
	 * @param options.extension Every file must have this extension
	 */
	function listFiles(directory?: string, options?: { pattern?: string | RegExp, extension?: string }): Promise<string[]>

	system.listFiles = system.ls = system.find = listFiles

	/**
	 * Lists all files in a directory and its subdirectories
	 * 
	 * @param directory Where you want to list the files. By default, it is set to the current working directory (`.`). Set this parameter to `__dirname` to list all the files in the directory your JavaScript file that is calling this function is in.
	 * @param options.pattern All files listed must have filenames that conform to this pattern
	 * @param options.extension Every file must have this extension
	 * @param options.exclude An array of folder names to exclude from the search. Every sub-folder beneath these excluded folders is excluded as well.
	 * @param options.depth The depth of the search. By default, it is `-1` which is an full search. Set this value to `-1` or `undefined` or leave it blank to perform a full search.
	 */
	function listFilesRecursive(directory: string = '.', options: { pattern?: string | RegExp, extension?: string, exclude?: string[], depth?: number } = {}): Promise<string[]>

	system.listFilesRecursive = system.lsr = system.findr = listFilesRecursive

	export = system
}