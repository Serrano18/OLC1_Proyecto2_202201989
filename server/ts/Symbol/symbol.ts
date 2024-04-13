import { TipoDato } from "../Abstract/resultado";

export class Symbol{
    public id: string;
    public value: any;
    public type: TipoDato;

    constructor(id: string, type: TipoDato, value: any) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}