import {Address, IAddress} from "./address";

export class Person {
  constructor(
    public id: number,
    public vorname: string,
    public name: string,
    public email: string,
    public address: Address,
    public birthsday: string,
    public cellphone: string,
  ) {
  }
}

export interface IPerson {
  id: number;
  vorname: string;
  name: string,
  email: string,
  address: IAddress,
  birthsday?: string,
  cellphone?: string,
  photo?: string | ArrayBuffer | null
}

