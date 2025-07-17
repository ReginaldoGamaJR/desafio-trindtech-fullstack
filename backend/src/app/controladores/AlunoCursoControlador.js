import Aluno from '../modelos/Aluno.js';
import Curso from '../modelos/Curso.js';
import AlunoCurso from '../modelos/AlunoCurso.js';

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
}
export default new AlunoCursoControlador();