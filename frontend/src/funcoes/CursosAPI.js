import api from "../services/api";
//Todos os arquivos de API, são basicamente iguais em estrutura, basta ler o de AlunoAPI.js para entender como funciona

export async function criarCurso(curso) {
    const response = await api.post("/cursos", curso);
    return response.data;
}

export async function buscarCursos() {
    const response = await api.get("/cursos");
    return response.data;
}

export async function atualizarCurso(id, curso) {
    const response = await api.put(`/cursos/${id}`, curso);
    return response.data;
}

export async function deletarCurso(id) {
    const response = await api.delete(`/cursos/${id}`);
    return response.data;
}