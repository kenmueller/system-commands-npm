/**
 * Runs a system command
 * 
 * @param command The command you want to run, like `ls` or `mkdir new_directory`
 * 
 * @returns A `Promise` containing the output of the command. If the command failed, the error is passed into the `.catch` block.
 */
export default function system(command: string): Promise<string>