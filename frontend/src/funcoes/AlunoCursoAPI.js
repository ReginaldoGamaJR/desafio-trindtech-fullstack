import api from "../services/api";
//Todos os arquivos de API, são basicamente iguais em estrutura, basta ler o de AlunoAPI.js para entender como funciona

export async function criarMatricula( alunoID, cursoID) {
    const response = await api.post(`/cursos/${cursoID}/alunos`, { alunoId: alunoID });
    return response.data;
}

export async function buscarMatriculas(alunoID) {
    const response = await api.get(`/alunos/${alunoID}/cursos`);
    return response.data;
}

export async function atualizarMatricula(alunoID, cursoID, matricula) {
    const response = await api.put(`/cursos/${cursoID}/alunos/${alunoID}`, matricula);
    return response.data;
}

export async function deletarMatricula(alunoID, cursoID) {
    const response = await api.delete(`/cursos/${cursoID}/alunos/${alunoID}`);
    return response.data;
}