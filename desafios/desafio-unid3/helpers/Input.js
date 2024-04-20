import { DateTime } from "luxon";
import PromptSync from "prompt-sync"; // Entrada de dados
import Output from "./output";

class Input {
    #prompt;
    #output;

    constructor() {
        this.#prompt = PromptSync({sigint: true}); // Sigint: true permite usar ctrl + c para parar o programa.
        this.#output = new Output();
    }
    //Método para facilitar a entrada de dados e saida, tendo os parametros necessarios para a validez
    readString(label, errorMsg, options = {}) {
        const min = options.min || 0;
        const max = options.max || 10000;
        const capitalize =  options.capitalize || false;
        const validChars = options.validChars || null;
        const regExp = options.regExp || null;
        const isValid = options.isValid || null;
    
        for (;;) { // Loop infinito
            let data = this.#prompt(label);

            if (capitalize) {
                data = data.toUpperCase();
            }
            
            if (data.length < min || data.length > max) {
                this.#output.writeLine(errorMsg);
            }
            else if (validChars && [...data].some((c) => !validChars.includes(c))) {
                this.#output.writeLine(errorMsg)
            }
            else if (regExp && !data.match(regExp)) {
                this.#output.writeLine(errorMsg);
            }
            else if (isValid && !isValid(data)) {
                this.#output.writeLine(errorMsg);
            }
            else {
                return data;
            }
        } 
    }

    readInteger(label, errorMsg, options = {}) {
        const min = options.min || Number.MIN_SAFE_INTEGER;
        const max = options.max || Number.MAX_SAFE_INTEGER;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);
            const match = data.match(/^([+-]{0,1})\d+$/);
            const num = Number.parseInt(data);

            if (!match || isNaN(num)) {
                this.#output.writeLine(errorMsg);
            }
            else if (num < min || num > max) {
                this.#output.writeLine(errorMsg);
            }
            else if (isValid && !isValid(num)) {
                this.#output.writeLine(errorMsg);
            }
            else {
                return num;
            }
        }
    }

    readFloat(label, errorMsg, options = {}) {
        const min = options.min || -Number.MIN_VALUE;
        const max = options.max || Number.MAX_VALUE;
        const minDecimals = options.minDecimals || 0;
        const maxDecimals = options.maxDecimals || 20;
        const isValid = options.isValid || null;

        for (;;) {
            let decimalPlaces = 0;

            const data = this.#prompt(label);
            const match = data.match(/^[+-]{0,1}\d+(?:\.(\d*)){0,1}$/);
            const num = Number.parseFloat(data);

            if (match && match[1]) {
                decimalPlaces = match[1].length;
            }
            if (!match || isNaN(num)) {
                this.#output.writeLine(errorMsg);
            }
            else if (
                num < min ||
                num > max ||
                decimalPlaces < minDecimals ||
                decimalPlaces > maxDecimals
            ) {
                this.#output.writeLine(errorMsg);
            }
            else if (isValid && !isValid(num)) {
                this.#output.writeLine(errorMsg);
            }
            else {
                return num;
            }
        }
    }

    readChar(label, errorMsg, options = {}) {
        const capitalize = options.capitalize || false;
        const validChars = options.validChars || null;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);

            let char;
            if (data) {
                if (capitalize) {
                    char = data[0].toUpperCase();
                } else {
                    char = data[0];
                }
            } else {
                char = null;
            }

            if (!char) {
                this.#output.writeLine(errorMsg);
            } else if (validChars && !validChars.includes(char)) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(char)) {
                this.#output.writeLine(errorMsg);
            } else {
                return char;
            }
        }
    }

    readDate(label, errorMsg, options = {}) {
        const mask = options.mask || 'ddMMyyyy';
        const min = options.min || null;
        const max = options.max || null;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);

            const dt = DateTime.fromFormat(data, mask);

            if (!dt.isValid) {
                this.#output.writeLine(errorMsg);
            } else if ((min && dt < min) || (max && dt > max)) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(dt)) {
                this.#output.writeLine(errorMsg);
            } else {
                return dt;
            }
        }
    }

    readTime(label, errorMsg, options = {}) {
        const mask = options.mask || 'HHmm';
        const minHour = options.minHour || 0;
        const minMinute = options.minMinute || 0;
        const maxHour = options.maxHour || 23;
        const maxMinute = options.maxMinute || 59;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);

            const dt = DateTime.fromFormat(data, mask);

            if (!dt.isValid) {
                this.#output.writeLine(errorMsg);
            } else if (
                dt.hour < minHour ||
                dt.hour > maxHour ||
                dt.minute < minMinute ||
                dt.minute > maxMinute
            ) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(dt)) {
                this.#output.writeLine(errorMsg);
            } else {
                return dt;
            }
        }
    }
}
export default Input;