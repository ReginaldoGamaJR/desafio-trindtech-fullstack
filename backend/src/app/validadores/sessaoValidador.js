import * as yup from 'yup';

class SessaoValidador {
    async store(req, res, next) {
        //Como todo validador, não há nenhuma grande diferença
        const schema = yup.object().shape({
            email: yup.string().email('Formato de email inválido').required('O campo email é obrigatório'),
            password: yup.string().required('O campo senha é obrigatório')
        });

        try {
            await schema.validate(req.body, {abortEarly: false});

            return next()
        } catch (error) {
            return res.status(400).json({
                error: 'Falha na validação',
                messages: error.inner.map((err) =>({
                    field: err.path,
                    message: err.message,
                })),
            });
        }
    }
}

export default new SessaoValidador();