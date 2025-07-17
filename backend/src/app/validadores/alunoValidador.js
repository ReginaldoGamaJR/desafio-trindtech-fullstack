import * as yup from 'yup';

/*
Para a validação de dados eu escolhi utilizar a biblioteca yup, poderia ser utilizando vários IFs, mas ficaria muito poluído
e difícil de refatorar, com a biblioteca fica bem mais limpo e fica dividido do código, assim bem mais fácil para quem for mexer
*/
class AlunoValidador {
    
    async store(req, res, next) {
        
        const schema = yup.object().shape({
            //Agora é só pegar todos os campos e validar cada um conforme foi o necessário, para ele, no caso do aluno os únicos campos que
            //não são necessários é o número da casa e o complemento, haja visto que tem casa sem número e sem complemento
            nome: yup.string().required('O campo nome é obrigatório'),
            //Aqui o .email, só diz que o email precisa estar no formato de email, e se não estiver retorna a mensagem dentro
            email: yup.string().email('Formato do email inválido').required('O campo email é obrigatório'),
            cpf: yup.string().required('O campo CPF é obrigatório').length(11, 'O CPF deve conter 11 números'),
            //Mesma coisa com a data
            dataNascimento: yup.date('O campo data de nascimento deve ser uma data válida').required('O campo data de nascimento é obrigatório'),
            celular: yup.string().required('O campo celular é obrigatório'),
            genero: yup.string().required('O campo gênero é obrigatório'),
            cep: yup.string().required('O campo CEP é obrigatório.'),
            logradouro: yup.string().required('O campo logradouro é obrigatório.'),
            numero: yup.string(), 
            complemento: yup.string(), 
            bairro: yup.string().required('O campo bairro é obrigatório.'),
            cidade: yup.string().required('O campo cidade é obrigatório.'),
            uf: yup.string().required('O campo UF é obrigatório.').length(2, 'O UF deve ter exatamente 2 caracteres.'),
            pais: yup.string().required('O campo país é obrigatório.'),
        });
        //Agora vamos realmente validar
        try {
            //Agora vou comparar o req.body com o schema que criei anteriormente, o abortEarly,
            //Como o nome sugere, significa para se algo estiver errado ele não parar e sim ir até o fim para ver se tem mais algo errado
            await schema.validate(req.body, {abortEarly: false});
            //Agora se tudo estiver certo, ele passa o req.body para a minha APi, se não estiver ele cai no catch e retorna o erro
            return next();
        } catch (error) {
            return res.status(400).json({
                error: 'Erro na validação.',
                messages: error.inner.map((err) => ({
                    field: err.path,
                    message: err.message,
                })),
            });
        }
    }
    async update(req, res, next) {

    const schema = yup.object().shape({
        nome: yup.string(),
        email: yup.string().email('Formato de e-mail inválido.'),
        cpf: yup.string().length(11, 'O CPF deve ter exatamente 11 caracteres.'),
        dataNascimento: yup.date('O campo data de nascimento deve ser uma data válida.'),
        celular: yup.string(),
        genero: yup.string(),
        cep: yup.string(),
        logradouro: yup.string(),
        numero: yup.string(),
        complemento: yup.string(),
        bairro: yup.string(),
        cidade: yup.string(),
        uf: yup.string().length(2, 'O UF deve ter exatamente 2 caracteres.'),
        pais: yup.string(),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (error) {
        return res.status(400).json({
            error: 'Erro na validação',
            messages: error.inner.map((err) => ({
                field: err.path,
                message: err.message,
        })),
      });
    }
  }
}

export default new AlunoValidador();