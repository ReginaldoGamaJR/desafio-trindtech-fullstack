import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
//Agora vou criar o modelo de usuário, esse modelo será diferente dos outros, pelo menos na segunda parte
class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        //Primeiro pegamos os atributos que estão na table do sgbd
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        //Aqui vamos usar um password_hash, ele não é a senha que cadastramos e sim ela depois de ser cripytografada
        password_hash: Sequelize.STRING, 

        //A senha que digitamos será do tipo virtual mesmo, pois só a usaremos para criar a hash dela, por meio da biblioteca bcrypt
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
        },
      },
      {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
      }
      
    );
    //Aqui vai ser onde a cripytografia acontece
    this.addHook('beforeSave', async (usuario) => {
      //o addHook beforesaver, antes de salvar, vai chamar a função bcrypt.hash() para cryptografar a senha
      if (usuario.password) {
        usuario.password_hash = await bcrypt.hash(usuario.password, 8);
      }
    });
  }
  //Aqui é um método sempre que for fazer login, a biblioteca tem o compare, que é capaz de comparar uma senha normal ao formato hash
  //E ver se são compatíveis
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}



export default Usuario;