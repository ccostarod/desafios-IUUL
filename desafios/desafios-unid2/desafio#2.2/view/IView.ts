import { ValidationError } from "../errors/ValidationError";

export interface IView {
    getInput(prompt: string): string;
    displayOutput(output: string): void;
    displayError(error: ValidationError): void;
}