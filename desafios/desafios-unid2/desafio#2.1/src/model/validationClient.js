    const luxon = require('luxon');

    class ValidacaoCliente {
        validaNome(nome) {
            if (!(typeof nome === 'string' && nome.length >= 5 && nome.length <= 60)) {
                return { codeError: 'SIZE_INVALID', message: 'Nome inválido. Deve ter entre 5 e 60 caracteres.' };
            }
        }

        validaCPF(cpf) {
            cpf = String(cpf).replace(/\D/g, "");
            if (cpf.length !== 11) return { codeError: 'CPF_INVALID', message: 'CPF inválido. Deve ter 11 dígitos.' };
        
            let soma = 0;
            for (let i = 0, j = 10; i < 9; i++, j--)
                soma += Number(cpf[i]) * j;
            let resto = (soma % 11 < 2) ? 0 : 11 - (soma % 11);
            if (resto !== Number(cpf[9])) return { codeError: 'CPF_INVALID', message: 'CPF inválido.' };
        
            soma = 0;
            for (let i = 0, j = 11; i < 10; i++, j--)
                soma += Number(cpf[i]) * j;
            resto = (soma % 11 < 2) ? 0 : 11 - (soma % 11);
            if (resto !== Number(cpf[10])) return { codeError: 'CPF_INVALID', message: 'CPF inválido.' };
        }        

        validaDataNascimento(dataNascimento) {
            if (dataNascimento.length !== 8) {
                return { codeError: 'DATE_FORMAT_INVALID', message: 'Formato de data de nascimento inválido. Deve ser uma string no formato ddMMyyyy.' };
            }

            const dataFormatada = luxon.DateTime.fromFormat(dataNascimento, 'ddMMyyyy');
            
            if (!dataFormatada.isValid) {
                return { codeError: 'DATE_INVALID', message: 'Data de nascimento inválida.' };
            }

            const idade = Math.floor(dataFormatada.diffNow('years').years * -1);
            if (!(idade >= 18)) {
                return { codeError: 'AGE_INVALID', message: 'Data de nascimento inválida. Deve ter pelo menos 18 anos.' };
            }
        }

        validaRendaMensal(rendaMensal) {
            if (!(typeof rendaMensal === 'undefined' || (typeof rendaMensal === 'number' && Number(rendaMensal.toFixed(2)) === rendaMensal))) {
                return { codeError: 'INCOME_INVALID', message: 'Renda mensal inválida. Deve ser um número com duas casas decimais.' };
            }
        }

        validaEstadoCivil(estadoCivil) {
            if (!(typeof estadoCivil === 'undefined' || ['C', 'S', 'V', 'D'].includes(estadoCivil.toUpperCase()))) {
                return { codeError: 'MARITAL_STATUS_INVALID', message: 'Estado civil inválido. Deve ser C, S, V ou D (maiúsculo ou minúsculo).' };
            }
        }
    }

    module.exports = ValidacaoCliente;