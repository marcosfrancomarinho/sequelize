class CheckErrors {
    constructor() {
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.messageError = {
            id: 'ID não identificado ou não é válido',
            name: 'Nome não foi identificado',
            password: 'Senha não foi informada',
            emailValidate: 'Informe um email válido',
            passwordValidate: 'Senha inválida, tente novamente',
            passwordLength: (length) => `Insira uma senha com mais de 8 dígitos: senha informada tem ${length} de comprimento`,
            emailRegister: 'Email já cadastrado, tente outro email',
            notFoundUser: 'Usuário não foi encontrado',
        };
    }

    // Verifica se o ID é válido
    hasId(id) {
        if (isNaN(id) || !id) {
            throw new Error(this.messageError.id);
        }
    }

    // Verifica se o nome é válido
    hasName(name) {
        if (!name || name.length <= 0) {
            throw new Error(this.messageError.name);
        }
    }

    // Verifica se a senha é válida
    hasPassword(password) {
        if (!password) {
            throw new Error(this.messageError.password);
        }
        if (password.length < 8) {
            throw new Error(this.messageError.passwordLength(password.length));
        }
    }

    // Verifica se o email é válido
    hasEmail(email) {
        if (!this.emailRegex.test(email)) {
            throw new Error(this.messageError.emailValidate);
        }
    }

    // Verifica se o ID e o email são válidos
    hasIdEmail(id, email) {
        this.hasId(id);
        this.hasEmail(email);
    }

    // Verifica se o ID e a senha são válidos
    hasIdPassword(id, password) {
        this.hasId(id);
        this.hasPassword(password);
    }

    // Verifica se o nome, email e senha são válidos
    hasEmailPasswordName(name, email, password) {
        this.hasName(name);
        this.hasEmail(email);
        this.hasPassword(password);
    }

    // Verifica se o email e a senha são válidos
    hasEmailPassword(email, password) {
        this.hasEmail(email);
        this.hasPassword(password);
    }

    // Verifica se o email já está registrado
    uniqueEmail(error) {
        const code = error?.original?.code;
        if (code === '23505') {
            throw new Error(this.messageError.emailRegister);
        }
    }

    // Valida a senha do usuário
    itsPasswordValidate({ password }, pass) {
        if (password !== pass) {
            throw new Error(this.messageError.passwordValidate);
        }
    }

    // Verifica se o usuário foi encontrado
    hasUser({ response }) {
        if (!response) {
            throw new Error(this.messageError.notFoundUser);
        }
    }
}

module.exports = CheckErrors;
