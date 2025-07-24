import Curso from '../modelos/Curso.js';
/*
Aqui é onde, será feita a parte de CRUD
*/
class CursoControlador {
  //O metodo store, como o próprio nome já demonstra, criei na intenção de guardar, de criar novos cursos no banco de dados
  async store(req, res) {
    //Pronto, agora vou criar o curso, utilizando o nome e a descrição que eu acabei de pegar do req
    const curso = await Curso.create(req.body);
    //Vou retornar o feedback positivo
    return res.status(201).json(curso);
  }
  //Agora chegamos na parte de Read do CRUD, o método index, ele vai servir para lermos todos os Cursos cadastrados
  async index(req, res) {
    //Crio a const cursos, que será um array, com todas as linhas da tabela curso criada
    const cursos = await Curso.findAll() //Aliás esse findAll é outro método que a class curso herda da Model do sequelize
    //Agora vou retornar, dizendo que está tudo OK
    return res.json(cursos)
  }
  //A parte update servirá para atualizarmos os cursos, se necessário for
  async update(req, res) {
    //Primeiro pego o ID do curso pedido
    const  { id }  =  req.params;
    //Agora vou utilizar o findByPK(Procurar utilizando a chave primária)
    const curso = await Curso.findByPk(id);
    //Tenho que tratar o caso de que o curso em questão não exista no meu Banco de dados
    if(!curso) {
      //Se o curso não for encontrado, se torna True, e aí vou retornar o error 404(Não encontrado), com uma mensagem de curso não registrado
      return res.status(404).json({ error: 'Curso não registrado. (Problema no update)'});
    }
    //Agora vou utilizar um método do sequelize que vai updatar o curso com o novo nome e descriçãp
    const cursoAtulizado = await curso.update(req.body);
    //Retornar o curso agora com todas as informações atualizadas
    return res.json(cursoAtulizado);
  }
  //A delete serve para apagarmos um curso do nosso banco de dados
  async delete(req, res) {
    //Buscando o ID do curso
    const { id }  = req.params;
    //Buscamos o curso, a sintaxe é muito similar a de atualizar ele
    const curso = await Curso.findByPk(id);
    //Tratando novamente o caso onde o curso pode não existir
    if(!curso) {
      return res.status(404).json({ error: 'Curso não registrado. (Problema no delete)'});
    }
    //Utilizo um método do sequelize o Destroy, para apagar o curso
    const cursoDeletado = await curso.destroy();
    //Retorno o status 204( No content )
    return res.status(204).send();
  }

  //Aqui serão criados os outros métodos do CRUD
}

export default new CursoControlador();