
class SessionManager {
    #consultorio;

    constructor() {
        this.#consultorio = new Consultorio();
    }

    get Consultorio() {
        return this.#consultorio;
    }
}
// Singleton: cria uma única instância de SessionManager
const Session = new SessionManager();

// Exporta somente o singleton
export default Session;