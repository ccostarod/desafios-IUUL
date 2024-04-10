export class Currency {
    private code: string;
    private value: number;

    constructor(code: string, value: number){
        this.code = code;
        this.value = value;
    }

    getCode(): string {
        return this.code;
    }

    getValue(): number {
        return this.value;
    }

    setValue(value: number){
        this.value = value;
    }
}