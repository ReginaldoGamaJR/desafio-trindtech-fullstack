import * as yup from 'yup';
//As validações são sempre didáticas e seguem a mesma regra da do aluno, então só comentárei o que for diferente
class CursoValidador {

    async store(req, res, next) {

        const schema = yup.object().shape({

            nome: yup.string().required('O campo nome é obrigatório'),
            descricao: yup.string().required('O campo descrição é obrigatório'),
        });

        try {
            await schema.validate(req.body, {abortEarly: false});
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
    async update(req, res, next) {

    const schema = yup.object().shape({

        nome: yup.string().strict(true),
        descricao: yup.string(),
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

export default new CursoValidador();