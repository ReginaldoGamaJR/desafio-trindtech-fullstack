import * as yup from 'yup';

class usuarioValidador {

    async store(req, res, next) {

        const schema = yup.object().shape({
            nome: yup.string().required('O campo nome é obrigatório'),
            email: yup.string().email('Formato de email inválido').required('O campo email é obrigatório'),
            password: yup.string().required('O campo senha é obrigatório').min(6, 'A senha deve ter no mínimo 6 caracteres')
        });

        try {
            await schema.validate(req.body, {abortEarly: false});
            return next();
        } catch (error) {
            return res.status(400).json({
                error: 'Falha na validação',
                messages: error.inner.map((err) => ({
                    field: err.path,
                    message: err.message
                })),
            });
        }
    }
}

export default new usuarioValidador();