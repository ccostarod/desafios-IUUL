class Validacao {
    validarCpf(cpf){
        if (cpf.length === 11){
            let numsCpf = cpf.split('');
            let aux = 0;
            for (let i = 0; i<numsCpf.length; i++){
                for (let j = i + 1; j < numsCpf.length; j++){
                    if (numsCpf[i] == numsCpf[j]) aux++;
                }
                if (aux === 10){
                    return {status:false, message: "Erro: os digitos são todos iguais, corrija!"};
                }
                break;
            }
            let constante = 10;
            let soma = 0;
            for (let i= 0; i < numsCpf.length - 2; i++){
                soma += numsCpf[i]*constante;
                constante--;
            }
            let resultado = soma % 11;
            if (resultado === 0 || resultado === 1){
                if(parseInt(numsCpf[9], 10) !== 0){
                    return {status: false, message: "Erro: CPF invalido!"}
                }
            }
            else{
                if(parseInt(numsCpf[9], 10) !== 11 - resultado){
                    return {status: false, message: "Erro: CPF invalido!"} 
                }
            }
            constante = 11;
            soma = 0;
            for (let i = 0; i < numsCpf.length - 1; i++){
                soma += numsCpf[i]*constante;
                constante--;
            }
            resultado = soma % 11;
            if (resultado === 0 || resultado === 1){
                if(parseInt(numsCpf[10], 10) !== 0){
                    return {status: false, message: "Erro: CPF invalido!"}
                }
            }
            else{
                if(parseInt(numsCpf[10], 10) !== 11 - resultado){
                    return {status: false, message: "Erro: CPF invalido!"};
                }
            }
            return {status: true};
        }
        return {status: false, message: "Erro: CPF com tamanho invalido!"};
    }
    validarCpfConsultaOuExclusao(cpf, agenda){
        if (validarcpf){
            if (!(agenda.listaPacientes.some(x=> x.cpf === cpf))){
                return {status: false, message: "Erro: Paciente nao cadastrado!"};
            }
            return {status: true};
        }
        return {status: false, message: "Erro: CPF invalido!"};
    }
    validarNome(nome){
        if (nome.length < 5){
            return false;
        }
        return true;
    }

    validarData(data){
        const partes = data.split("/");

        if (partes.length !== 3) {
            return false;
        }

        const dia = parseInt(partes[0], 10);
        if (dia < 1 || dia > 31) {
            return false;
        }

        const mes = parseInt(partes[1], 10);
        if (mes < 1 || mes > 12) {
            return false;
        }

      
        const ano = parseInt(partes[2], 10);
        if (ano < 1900 || ano > 2028) { //Estipulei 2028 como data final pois nao foi dito no documneto para até que ano se pode agendar uma consulta.
            return false;
        }

        return true;
    }

    validarDataNascimento(dataNascimento){
        if (this.validarData(dataNascimento)){
            const partes = dataNascimento.split("/");
            const diaNascimento = parseInt(partes[0], 10);
            const mesNascimento = parseInt(partes[1], 10);
            const anoNascimento = parseInt(partes[2], 10);

            const dataAtual = new Date();
            const diaAtual = dataAtual.getDate();
            const mesAtual = dataAtual.getMonth() + 1;
            const anoAtual = dataAtual.getFullYear();

            // Calcula a idade
            let idade = anoAtual - anoNascimento;

            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
                idade--;
            }

            // Verifica se a idade é 13 ou mais
            if (idade < 13) {
                return {status: false, message: "Erro: Paciente deve ter pelo menos 13 anos."};
            }
            return {status: true};
        }
        return {status: false, message: "Erro: Formato de data inválido!"};
    }

    validarDataConsulta(dataConsulta, horaInicialConsulta){
        if (this.validarData(dataConsulta)){
            const partes = dataConsulta.split("/");
            const diaConsulta = parseInt(partes[0], 10);
            const mesConsulta = parseInt(partes[1], 10);
            const anoConsulta = parseInt(partes[2], 10);

            const dataAtual = new Date();
            const diaAtual = dataAtual.getDate();
            const mesAtual = dataAtual.getMonth() + 1; // getMonth() retorna o mês de 0 a 11
            const anoAtual = dataAtual.getFullYear();

            // Compara a data da consulta com a data atual
            if (anoConsulta > anoAtual || 
                (anoConsulta === anoAtual && mesConsulta > mesAtual) || 
                (anoConsulta === anoAtual && mesConsulta === mesAtual && diaConsulta > diaAtual) ||
                (anoConsulta === anoAtual && mesConsulta === mesAtual && diaConsulta === diaAtual && parseInt(horaInicialConsulta, 10) > parseInt(dataAtual.getHours() + '' + (dataAtual.getMinutes() < 10 ? '0' : '') + dataAtual.getMinutes(), 10))) {
                return {status: true};
            }
            return {status: false, message: "Erro: A consulta está sendo marcada para uma data passada!"};
        }
        return {status: false};
    }

    validarHora(hora){
        if (hora.length < 4){
            return {status: false, message: "Erro: Hora no formato inválido"};
        }
        const horas = parseInt(hora.substring(0,2), 10);
        const minutos = parseInt(hora.substring(2), 10);

        if (horas < 8 || horas > 19){
            return {status: false, message: "Erro: Fora do horario comercial"};
        }
        if (horas === 19 && minutos > 0){
            return {status: false, message: "Erro: Ultrapassou o horario comercial"};
        }
        const minutosValidos = [0, 15, 30, 45];
        for (let i = 0; i < minutosValidos.length; i++){
            if (minutos === minutosValidos[i]){
                return {status: true};
            }
        }
        return {status: false, message: "Erro: Fora dos minutos de atendimento"};
    }

    compararHoras(hora1, hora2){
        const horaInt1 = parseInt(hora1, 10);
        const horaInt2 = parseInt(hora2, 10);

        if (horaInt1 < horaInt2) {
            return true;
        } 
        return false;   
    }

}
module.exports = Validacao;