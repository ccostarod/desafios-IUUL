import { Currency } from "../model/Currency";
import { ExchangeRate } from "../model/ExchangeRate";

export interface IExchangeRateController {
  convert(from: Currency, to: Currency): Promise<ExchangeRate | null>;
}