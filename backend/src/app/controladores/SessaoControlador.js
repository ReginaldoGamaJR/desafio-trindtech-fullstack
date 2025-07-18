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

        if (!(await usuario.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

        const { id, nome} = usuario;

        const token = jwt.sign({ id, nome, email },
             process.env.APP_SECRET,
              {expiresIn: process.env.JWT_EXPIRES_IN}
            );

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