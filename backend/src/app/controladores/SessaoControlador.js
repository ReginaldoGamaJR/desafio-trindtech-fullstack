import jwt from 'jsonwebtoken';
import Usuario from '../modelos/Usuario.js';

class SessaoControlador {
    
    async store(req, res) {

        const {email, password} = req.body; 

        const usuario = await Usuario.findOne({
            where: {
                email,
            },
        });
        if (!usuario) {
            return res.status(401).json({ error: 'Email não encontrado.' });
        }
        //Essa função eu defini ela no modelo de usuário
        if (!(await usuario.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

        const { id, nome} = usuario;
        //Aqui é onde o token está sendo criado com um método da biblioteca JWT
        const token = jwt.sign({ id, nome, email },
             process.env.APP_SECRET,
              {expiresIn: process.env.JWT_EXPIRES_IN}
            );
            //agora só vou retornar o json com tudo inclusive o token
        return res.json({
            usuario: {
                id,
                nome,
                email
            },
            token,
        });
    }
}

export default new SessaoControlador();