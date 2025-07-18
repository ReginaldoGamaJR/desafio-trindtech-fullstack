import jwt from 'jsonwebtoken';
import { promisify } from 'util'; 
//Vou autenticar tudo com esse arquivo
export default async (req, res, next) => {
  //Eu primeiro pego o token no headers authorization
  const authHeader = req.headers.authorization;

 //Se não houver token, então fica true e eu retorno a mensagem de error com token n fornecido
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  /*
  O token ele vem em um formato bearer (Ele vem em um formato nesse estilo: Bearer (token aqui))
  Mas como eu quero validar apenas o token, eu preciso retirar a parte inicial e pegar somente o token
  Então eu vou usar o split, e dividir a string no espaço que tem entre o Bearer e o token, e agora sim
  a parte após o espaço, que no caso é o token, vai para a const token
  */
  const [, token] = authHeader.split(' ');

  try {
    //Agora, utilizando um método da biblioteca jwt, verifico o token e vejo se está tudo certo
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    //Agora que sei que o token tá certinho, eu pego o Id do usuário e boto na req
    req.userId = decoded.id;

    
    return next();

  } catch (error) {

    return res.status(401).json({ error: 'Token inválido.' });
  }
};