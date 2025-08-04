import api from "../services/api";
    //Esse arquivo vai ser onde eu vou botar todas as funções relacionadas a API de alunos
    //No meu alunoControlador, eu tenho o store, index, mostrar, update, delete
    //Vou criar as funções para cada um desses endpoints
    
    //Essa função vai utilizar o endpoint de MOSTRAR(mostrar) um aluno em específico
    export async function buscarAlunoPorId(id) {
      const response = await api.get(`/alunos/${id}`);
      return response.data;
    }
    //Essa função vai utilizar o endpoint de DELETAR(delete) um aluno em específico
     export async function deletarAlunoPorId(id) {
    //Essa função vai ser para deletar o aluno 
      await api.delete(`/alunos/${id}`);
    } 
    //Essa função vai utilizar o endpoint GET(index) de todos os alunos
    export async function buscarTodosAlunos() {
        const response = await api.get('/alunos')
        return response.data;
    }
    //Essa função aqui é para criar(store) um aluno 
    export async function criarAluno(aluno) {
      const response = await api.post('/alunos', aluno);
      return response.data;
    }
    //Essa função aqui é para atualizar(update) um aluno
    export async function atualizarAluno(id, aluno) {
      const response = await api.put(`/alunos/${id}`, aluno);
      return response.data;
    }
