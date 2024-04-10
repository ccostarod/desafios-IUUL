import { IView } from './view/IView';
import { CurrencyConverterPresenter } from './presenter/CurrencyConverterPresenter';
import { ConsoleView } from './view/ConsoleView';
import { ExchangeRateController } from './controller/ExchangeRateController';
import { RunConversionLoop } from './presenter/RunConversionLoop';

const view: IView = new ConsoleView();
const exchangeRateController = new ExchangeRateController();
const presenter = new CurrencyConverterPresenter(view, exchangeRateController);
const runConversionLoop = new RunConversionLoop(view, presenter);

runConversionLoop.start();