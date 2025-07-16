import Curso from '../modelos/Curso.js';
/*
Aqui é onde, será feita a parte de CRUD
*/
class CursoControlador {
  //O metodo store, como o próprio nome já demonstra, criei na intenção de guardar, de criar novos cursos no banco de dados
  async store(req, res) {
    //Aqui eu pego o nome e a descrição do curso, do body do req
    const { nome, descricao } = req.body;
    //Pronto, agora vou criar o curso, utilizando o nome e a descrição que eu acabei de pegar do req
    const curso = await Curso.create({
      nome,
      descricao,
    });
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

  //Aqui serão criados os outros métodos do CRUD
}

export default new CursoControlador();