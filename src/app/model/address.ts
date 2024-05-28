export class Address {
  constructor(
    public plz: number,
    public country: string,
    public region: string,
    public ort: string,
    public strasse: string,
    public hausnummer: number
  ) {
  }
}

export interface IAddress {
  plz?: number;
  country?: string;
  region?: string;
  ort?: string;
  strasse?: string;
  hausnummer?: number;
}
