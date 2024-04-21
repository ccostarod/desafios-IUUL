import MainController from "./controller/MainController.js";
import MenuPresenter from "./presenter/MenuPresenter.js";

(function () {
    // Cria o controller
    const controller = new MainController();

    // Cria o Presenter
    const presenter = new MenuPresenter(controller);

    // Presenter assume a execução
    presenter.run();
})();