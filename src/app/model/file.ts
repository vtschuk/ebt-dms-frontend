export class File {
  constructor(
    public id: number,
    public filenumber: string,
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
  filenumber: string,
  name: string,
  date: string,
  issue: string,
  description: string,
  archive: boolean,
  encrypted: boolean
}

