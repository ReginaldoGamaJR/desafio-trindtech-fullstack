import Aluno from "../modelos/Aluno.js";
//Agora vou criar o Controlador para o Model de Alunos
class AlunoControlador {
    //Da mesma forma de Curso, preciso de um store, para criar alunos
    async store(req, res) {
      try {  //Utilizando o método Create do Sequelize, crio um aluno com todos os atributos que estão no body da req
        const aluno = await Aluno.create(req.body);
        //Retorno um status 201 (Criado)
        return res.status(201).json(aluno)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar aluno (Problema no store)', details: error.message})
    }
  }
    //Agora crio o GET
    async index(req, res) {
        //alunos será um array com todo Aluno que estiver cadastrado
        //Adicionei o order, pois quando eu estava atualizando os alunos, o aluno que estava sendo atualizado ia parar no final do array
        //Agora ele vai ficar no lugar onde estava quando foi criado
        const alunos = await Aluno.findAll({order: [['createdAt', 'ASC']]});
        //Retorno um json que será o array
        return res.json(alunos)
    }
    //Criei o endpoint para mostrar os detalhes de um só aluno, para usar no fronten
    async mostrar(req, res) {
        try {
        const { id } = req.params;
        const aluno = await Aluno.findByPk(id);
        if(!aluno) {
            return res.status(404).json({ error: 'Aluno não registrado (Problema no mostrar)'})
        }
        return res.json(aluno)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar aluno (Problema no mostrar)'})
        }
    }
    //Criei o update
    async update(req, res) {
        const { id } = req.params;

        const aluno = await Aluno.findByPk(id);
        //Tratando o caso de que o Aluno não esteja registrado
        if(!aluno) {
            return res.status(404).json({ error: 'Aluno não registrado (Problema no update)'})
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
    //Criei o delete
    async delete(req, res) {
        const { id } = req.params;

        const aluno = await Aluno.findByPk(id);
        //Tratamento do caso de aluno não existir
        if(!aluno) {
            return res.status(404).json({ error: 'Aluno não registrado (Problema no delete'})
        }
        //Deletando o aluno
        const alunoDeletado = await aluno.destroy()
        //Retornando um no content
        return res.status(204).send()   
    }
}
//Exporto para ser usado em outras partes do código
export default new AlunoControlador();