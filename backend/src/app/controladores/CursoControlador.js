import Curso from '../modelos/Curso.js';

class CursoControlador {
  
  async store(req, res) {
    
    const { nome, descricao } = req.body;

    const curso = await Curso.create({
      nome,
      descricao,
    });
    
    return res.status(201).json(curso);
  }
}

export default new CursoControlador();