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

	system.listFiles = system.ls = listFiles

	export = system
}