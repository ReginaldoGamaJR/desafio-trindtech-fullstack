import Aluno from "../modelos/Aluno.js";
//Agora vou criar o Controlador para o Model de Alunos
class AlunoControlador {
    //Da mesma forma de Curso, preciso de um store, para criar alunos
    async store(req, res) {
        //Primeiro pego todos os atributos que vem na req.body
        const { 
            nome, 
            email, 
            cpf, 
            dataNascimento, 
            celular, 
            cep,
            logradouro, 
            numero, 
            complemento,
            bairro, 
            cidade, 
            uf,
            genero, 
            pais } = req.body;
        //Utilizando o método Create do Sequelize, crio um aluno com todos os atributos que peguei
        const aluno = await Aluno.create({
            nome, 
            email, 
            cpf, 
            dataNascimento, 
            celular, 
            cep,
            logradouro, 
            numero, 
            complemento,
            bairro, 
            cidade, 
            uf,
            genero, 
            pais
        });
        //Retorno um status 201 (Criado)
        return res.status(201).json(aluno)
    }
}
//Exporto para ser usado em outras partes do código
export default new AlunoControlador();