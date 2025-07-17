import Aluno from '../modelos/Aluno.js';
import Curso from '../modelos/Curso.js';
import AlunoCurso from '../modelos/AlunoCurso.js';
import cursocontrolador from './cursocontrolador.js';

class AlunoCursoControlador {
    //Iniciando o CRUD
    //Começando pelo CREATE, ou seja, matriculá de um aluno
  async store(req, res) {
    //Vou usar um try, pois se der errado, dou catch error e vai significar que o aluno já está matriculado no curso
    try {
        //Pego o Id do aluno e do curso
      const { cursoId } = req.params;
      const { alunoId } = req.body;

     //Vou tratar os erros, no caso de não existir o curso, ou não existir o aluno
      const curso = await Curso.findByPk(cursoId);
      if (!curso) {
        return res.status(404).json({ error: 'Curso não registrado.' });
      }

      const aluno = await Aluno.findByPk(alunoId);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não registrado.' });
      }

      //Agora vou efetivamente fazer a matrícula
      const matricula = await AlunoCurso.create({
        //As duas foreign keys, o Id do curso e do aluno
        curso_id: cursoId,
        aluno_id: alunoId,
        //E o atributo status, no caso já que foi matriculado, automaticamente está em andamento
        status: 'em_andamento', 
      });
      //Retornar um status 201, foi matriculado com sucesso
      return res.status(201).json(matricula);

    }
    //E agora por fim, vou dar o catch error, dizer que o erro foi na matrícula 
    catch (error) {
      console.error('ERRO AO REALIZAR MATRÍCULA:', error);
      return res.status(500).json({
        //Retornando o motivo real do error
        error: 'Aluno já matriculado no curso.',
      });
    } 
  }
  //Agora o GET
  async index(req, res) {
    try {
      //Primeiro vou pegar o ID do aluno em questão que quero ver os cursos
      const { alunoId } = req.params;
      //Vamos encontrar o aluno pela chave primária
      const aluno = await Aluno.findByPk(alunoId);
      //Tratar o caso de o aluno não existir
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado.'})
      }
      //Vou achar todas as matrículas do aluno em questão
      const matriculas = await AlunoCurso.findAll({
        where: { aluno_id: alunoId },
      });
      //Vou usar o map, para interar e procurar todos os IDs dos cursos
      const cursoId = matriculas.map((matricula) => matricula.curso_id);
      //Agora que já tenho os IDs, basta apenas encontrar a qual curso eles pertencem
      const cursos = await Curso.findAll( {
        where: {
          id: cursoId,
        },
        //Agora vou pegar os atributos
        attributes: ['id', 'nome', 'descricao'],
      });

      return res.json(cursos)
      
    }
    //Se ele sair do try, significa que ocorreu algum erro interno do sistema, então mostrar
    catch (error) {
      console.error('Erro ao ver os cursos do aluno:', error);
      //Retornar agora um erro 500 (Erro interno do servidor)
      return res.status(500).json({ error: 'Falha ao encontrar as matrículas.'})
    }
    
  }

  //Agora o UPDATE

  async update(req, res) {

    const {alunoId, cursoId} = req.params;

    const { status } = req.body;
    //Vou buscar a matrícula em questão utilizando o id do aluno e do curso, vou achar uma só
    const matricula = await AlunoCurso.findOne({
      where: {
        aluno_id: alunoId,
        curso_id: cursoId
      },
    });
    //Validar se a matrícula existe

    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula não encontrada.'})
    };
    //Vou atualizar a matrícula agora

    await matricula.update({ status });

    return res.json(matricula)
  }

  //Por último o DELETE

  async delete(req, res) {
    //Pegando os IDs
    const { alunoId, cursoId } = req.params;
    //Procurando a matrícula 
    const matricula = await AlunoCurso.findOne({
      
      where: {
        aluno_id: alunoId,
        curso_id: cursoId,
      },
    });
    //Agora, vou validar para ver se a matrícula existe
    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula não encontrada.'})
    }
    //Se a matrícula existe, então vamos deletá-la
    await matricula.destroy();
    //Retornar o status 204 (Content not found) e de fato não deve ser encontrado se for deletado
    return res.status(204).send();
  }
}
export default new AlunoCursoControlador();