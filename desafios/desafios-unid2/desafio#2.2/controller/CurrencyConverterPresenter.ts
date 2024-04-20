import { IView } from '../view/IView';
import { IExchangeRateController } from './IExchangeRateController';
import { Currency } from '../model/Currency';
import { ExchangeRate } from '../model/ExchangeRate';
import { ValidationError } from '../errors/ValidationError';

export class CurrencyConverterPresenter {
  constructor(private view: IView, private exchangeRateController: IExchangeRateController) {}

  validate(from: Currency, to: Currency, amount: number): ValidationError | null {
    if (from.getCode() === to.getCode()) {
      return new ValidationError(1, 'Moeda origem não pode ser igual a moeda destino.');
    }

    if (from.getCode().length !== 3 || to.getCode().length !== 3) {
      return new ValidationError(2, 'Moeda de origem e de destino devem ter exatamente 3 caracteres.');
    }

    if (amount <= 0) {
      return new ValidationError(3, 'Valor de entrada deve ser maior que 0.');
    }

    return null;
  }

  async convertCurrency(fromCode: string, toCode: string, amount: number): Promise<void> {
    const from = new Currency(fromCode, amount);
    const to = new Currency(toCode, 0);
    const soma = 0;
    const validationError = this.validate(from, to, amount);
    if (validationError){
        this.view.displayError(validationError);
        return;
    }
    
    const exchangeRate: ExchangeRate | null = await this.exchangeRateController.convert(from, to);
    if (!exchangeRate) {
        this.view.displayError(new ValidationError(4, 'Erro ao buscar taxa de câmbio.'));
        return;
    }
    to.setValue(parseFloat((amount * exchangeRate.getRate()).toFixed(2)));

    const tax = parseFloat(exchangeRate.getRate().toFixed(6));

    this.view.displayOutput(`${from.getCode()} ${from.getValue()} ==> ${to.getCode()} ${to.getValue()}`);
    this.view.displayOutput(`Taxa: ${tax.toFixed(6)}`)
  }
}