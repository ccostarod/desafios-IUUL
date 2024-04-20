// RunConversionLoop.ts
import { IView } from './IView';
import { CurrencyConverterPresenter } from '../controller/CurrencyConverterPresenter';

export class RunConversionLoop {
  private view: IView;
  private presenter: CurrencyConverterPresenter;

  constructor(view: IView, presenter: CurrencyConverterPresenter) {
    this.view = view;
    this.presenter = presenter;
  }

  async start() {
    while (true) {
      const fromCode = this.view.getInput('Digite o codigo da moeda que voce deseja converter: ');
      if (fromCode === '') {
        break;
      }
      const toCode = this.view.getInput('Digite o codigo da moeda para a qual voce deseja converter: ');
      const amount = Number(this.view.getInput('Digite a quantidade que voce deseja converter: '));

      await this.presenter.convertCurrency(fromCode, toCode, amount);
    }
  }
}