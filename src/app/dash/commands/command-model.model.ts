export class CommandData{
  constructor(
  public command_tech?: string,
  public command_text?: string,
  public command_description?: string,
  ){}
}

export interface Command {
  command_id?: number,
  command_tech?: string,
  command_text?: string,
  command_description?: string,
}
