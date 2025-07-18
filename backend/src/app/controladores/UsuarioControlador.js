import Usuario from '../modelos/Usuario.js';

class UsuarioControlador {
    //Criar o POST para criarmos novos logins
    async store(req, res) {
        //Vamos agora pegar o email, para ver se já existe alguém com o mesmo email cadastrado
        const usuarioExistente = await Usuario.findOne({
            where: {
                email: req.body.email,
            },
        });
        //Agora que já temos o email vamos validá-lo
        if (usuarioExistente) {
            //Aqui envio o erro 409 (Conflict), que como o nome já diz, significa que está tendo conflito entre dados
            return res.status(409).json({ error: 'Email já cadastrado'})
        };
        //Agora, se o usuário não existe, significa que precisamos criar
        const { id, nome, email} = await Usuario.create(req.body);
        //Após criado, vamos retornar com sucesso

        return res.status(201).json({ id, nome, email});
    }
}

export default new UsuarioControlador();