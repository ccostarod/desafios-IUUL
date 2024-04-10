import readlineSync from 'readline-sync';
import { IView } from './IView';
import { ValidationError } from '../errors/ValidationError';

export class ConsoleView implements IView {
  displayError(error: ValidationError): void {
      console.error(`Erro ${error.code}: ${error.message}`);
  }
  getInput(prompt: string): string {
    return readlineSync.question(prompt);
  }

  displayOutput(output: string): void {
    console.log(output);
  }
}