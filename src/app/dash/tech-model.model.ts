export class CommandTechData{
  constructor(
  public tech_name?: string,
  public tech_image?: string,
  public tech_description?: string,
  ){}
}

export interface Tech{
  tech_id: number;
  tech_name: string;
  tech_image: string;
  tech_description: string;
}

export interface CommandTech{
  tech_id: number;
  tech_name: string;
}


