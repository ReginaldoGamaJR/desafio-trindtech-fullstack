import * as yup from 'yup';

class alunoCursoValidador {

  async update(req, res, next) {
    const schema = yup.object().shape({
      status: yup
        .string()
        .required('O campo status é obrigatório')
        //Aqui, é um método novo, o oneOf serve, como o nome diz, para validar e só aceitar
        //Um dos nomes que está dentro do array, se não for ele retorna uma mensagem falando
        .oneOf(
          ['em_andamento', 'concluido', 'trancado', 'encerrado'],
          'O status deve ser um dos seguintes: em_andamento, concluido, trancado, encerrado'
        ),
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

export default new alunoCursoValidador();