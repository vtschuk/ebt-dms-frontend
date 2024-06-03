 export class File {
  constructor(
    public id: number,
    public name: string,
    public date: string,
    public issue: string,
    public description: string,
    public archive: boolean,
    public encrypted: boolean

  ) {
  }
}

export interface IFile {
  id: number,
  name: string,
  date: string,
  issue: string,
  description: string,
  archive: boolean,
  encrypted: boolean
}

