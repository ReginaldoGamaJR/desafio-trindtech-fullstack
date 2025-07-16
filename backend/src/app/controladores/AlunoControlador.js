import Aluno from "../modelos/Aluno.js";
//Agora vou criar o Controlador para o Model de Alunos
class AlunoControlador {
    //Da mesma forma de Curso, preciso de um store, para criar alunos
    async store(req, res) {
        //Primeiro pego todos os atributos que vem na req.body
        const { 
            nome, 
            email, 
            cpf, 
            dataNascimento, 
            celular, 
            cep,
            logradouro, 
            numero, 
            complemento,
            bairro, 
            cidade, 
            uf,
            genero, 
            pais } = req.body;
        //Utilizando o método Create do Sequelize, crio um aluno com todos os atributos que peguei
        const aluno = await Aluno.create({
            nome, 
            email, 
            cpf, 
            dataNascimento, 
            celular, 
            cep,
            logradouro, 
            numero, 
            complemento,
            bairro, 
            cidade, 
            uf,
            genero, 
            pais
        });
        //Retorno um status 201 (Criado)
        return res.status(201).json(aluno)
    }
    //Agora crio o GET
    async index(req, res) {
        //alunos será um array com todo Aluno que estiver cadastrado
        const alunos = await Aluno.findAll();
        //Retorno um json que será o array
        return res.json(alunos)
    }
    //Criei o update
    async update(req, res) {
        const { id } = req.params;

        const aluno = await Aluno.findByPk(id);
        //Tratando o caso de que o Aluno não esteja registrado
        if(!aluno) {
            return res.status(404).json({ error: 'Aluno não registrado'})
        }
        /*
        Agora, quando eu havia botado todos os atributos o código ficou muito grande e meio difícil de ler
        Então depois de pesquisar um pouco, achei que existe a forma de apenas botar req.body
        é muito melhor, e também se lá na frente eu adicionar algum atributo não existente ainda a alunos
        não vou precisar mexer no código pois o sequelize já o está fazendo
        */
        const alunoAtualizado = await aluno.update(req.body)

        return res.json(alunoAtualizado)

    }
}
//Exporto para ser usado em outras partes do código
export default new AlunoControlador();