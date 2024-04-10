import axios from 'axios';
import { Currency } from '../model/Currency';
import { ExchangeRate } from '../model/ExchangeRate';
import { IExchangeRateController } from './IExchangeRateController';
import { ValidationError } from '../errors/ValidationError';

export class ExchangeRateController implements IExchangeRateController {
  private apiURL = 'https://v6.exchangerate-api.com/v6/712b12c62d17820028de620f/latest';

  async convert(from: Currency, to: Currency): Promise<ExchangeRate | null> {
    try {
        const response = await axios.get(`${this.apiURL}/${from.getCode()}`);
        const rate = response.data.conversion_rates[to.getCode()];
        return new ExchangeRate(from.getCode(), to.getCode(), rate);
    }
    catch (error) {
        return null;
    }
  }
}