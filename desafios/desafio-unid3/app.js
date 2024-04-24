import { syncDb } from './database/index.js';
import MainController from "./controller/MainController.js";
import MenuPresenter from "./presenter/MenuPresenter.js";

(async function () {
    // Sincroniza o banco de dados
    await syncDb();

    // Cria o controller
    const controller = new MainController();

    // Cria o Presenter
    const presenter = new MenuPresenter(controller);

    // Presenter assume a execução
    presenter.run();
})();