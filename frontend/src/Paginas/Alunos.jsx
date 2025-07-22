import { useEffect, useState } from "react";
import api from "../services/api";
/*
Eu utilizei a tecnica de componentização para facilitar e ficar mais organizado
Aqui é a parte onde cuida dos alunos, onde eu busco os alunos no meu backend e os cursos que eles estão cursando
*/
function Alunos() {
  //Aqui eu defini os estados e as funções que eu vou usar
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");
  const [cursosPorAluno, setCursosPorAluno] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const alunosPorPagina = 10;

  useEffect(() => {
    async function fetchAlunos() {
      //Aqui é onde eu vou buscar os alunos no meu backend
      try {
        //Primeiro vou buscar o token, pq sem ele não consigo chegar ao meu backend
        const token = localStorage.getItem("token");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //Após pegar o token, eu uso um get para pegar alunos, e jogar eles dentro do response
        const response = await api.get("/alunos");
        //Quando eu peguei os alunos, eu jogo eles dentro do setAlunos, que é a única função que é capaz de alterar o estado de alunos
        setAlunos(response.data);

        // forEach, como o nome já diz, para cada aluno, eu vou buscar os cursos que ele está fazendo
        //Esses cursos eu vou encontrar dentro da tabela relacional, que é a tabela que relaciona alunos e cursos
        response.data.forEach(async (aluno) => {
          //O req dela tem que ser feito dessa forma, com o aluno.id
          const cursosResp = await api.get(`/alunos/${aluno.id}/cursos`);
          //Após pegar os cursos, eu jogo eles dentro do setCursosPorAluno, que é a única função que é capaz de alterar o estado de cursosPorAluno
          setCursosPorAluno(prev => ({
            //O prev é o estado anterior, e eu vou usar ele para adicionar o novo aluno e os novos cursos
            ...prev,
            //Aqui eu vou mostrar os cursos que um aluno está fazendo, utilizando o aluno.id como chave
            //O cursosResp.data é o array de cursos que eu peguei do backend
            [aluno.id]: cursosResp.data
          }));
        });
        //Aqui se der algum erro, em qualquer parte da busca por alunos ou cursos, eu botei para mostrar um alerta de erro
        //Isso facilita para eu saber onde deu algo errado
      } catch (error) {
        alert("Erro ao buscar alunos!");
      }
    }
    //Aqui eu vou chamar a função que acabei de criar
    //o useEffect vai ser chamado só uma vez, quando a página for carregada
    fetchAlunos();
  }, []);
  //Aluno filtrados, vão ser os alunos que eu vou mostrar na tabela
  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );
  //esse ultimo aluno, é o ultimo aluno que eu vou mostar na tabela dependendo da pagina que eu estou
  const indiceUltimoAluno = paginaAtual * alunosPorPagina;
  //Já que já achei o último, basta pegar ele e diminuir por 10, que é o numero de alunos por página
  const indicePrimeiroAluno = indiceUltimoAluno - alunosPorPagina;
  //Aqui eu vou escolher os alunos que vou mostrar em determinada página, pois basta apenas pegar o indice entre o primeiro e o ultimo daquela página
  const alunosPagina = alunosFiltrados.slice(indicePrimeiroAluno, indiceUltimoAluno);
  //Total de página é literalmente só dividir o numero de alunos por 10, e sempre arredondando para cima, pois podemos ter uma página com menos de 10, mas nenhuma com mais de 10
  const totalPaginas = Math.ceil(alunosFiltrados.length / alunosPorPagina);

  return (
    //Aqui, é o que vai aparecer na tela para a pessoa ver
    <div className="container">

      <div className="d-flex align-items-center mt-5 mb-4" style={{ gap: 16 }}>

        <div className="input-group" style={{ height: 48, flexGrow: 1 }}>
          <input
          //Aqui é a barra de buscar por alunos
            type="text"
            className="form-control"
            //No placeHolder, é onde fica a frase quando a gente não escreve nada
            placeholder="Buscar por aluno"
            //Value é o valor que vai aparecer quando terminarmos de buscar
            value={busca}
            onChange={e => setBusca(e.target.value)}
            //Aqui é o estilo da barra
            style={{
              height: 48,
              borderRadius: "12px 0 0 12px",
              fontSize: 16,
            }}
          />
          <span
          //Esse span, é onde eu vou botar o ícone de busca que peguei no site de icones do bootstrap
            className="input-group-text bg-white"
            style={{
              borderRadius: "0 12px 12px 0",
              height: 48,
              display: "flex",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
              borderLeft: 0,
            }}
          >
            {/* Aqui é o ícone de busca, esse bi bi é o que eu peguei no site de icones do bootstrap */}
            <i className="bi bi-search" style={{ color: "#EA394E", fontSize: 22 }}></i>
          </span>
        </div>
        {/* Esse butão é o de adicionar, o ícone dele também peguei no site de icones do bootstrap */}
        <button
          className="btn btn-white border border-secondary text-black d-flex align-items-center"
          style={{
            height: 48,
            borderRadius: 12,
            minWidth: 140,
            fontSize: 16,
            fontWeight: 500,
            gap: 8,
          }}
        >
          <i className="bi bi-person-plus" style={{ color: "#EA394E", fontSize: 22 }}></i>
          Adicionar
        </button>
      </div>

      {/* Aqui é efetivamente a tabela, tanto que usei o th e td e tbody*/}
      <div className="card p-3">
        <table className="table align-middle h-30">
          <thead>
            <tr>
              <th>Data de cadastro</th>
              <th>Nome</th>
              <th>Estado</th>
              <th>Cursos</th>
            </tr>
          </thead>
          <tbody>
            {/* Agora vou utilizar um map, para pegar de cada aluno da página, o atributo que eu quero, no caso quero o 
            createdAt, nome, uf para isso estou usando o aluno.id como chave, e também na data, tive que utilizar toLocaleDateString pt-br para formatar*/}
            {alunosPagina.map(aluno => (
              <tr key={aluno.id}>
                <td>{new Date(aluno.createdAt).toLocaleDateString('pt-BR')}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.uf}</td>
                <td>
                {(cursosPorAluno[aluno.id] || []).map(curso => (
                    <span key={curso.id} className="badge bg-muted text-info border border-info me-1">{curso.nome}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Aqui é a paginação, onde eu vou mostrar as páginas, e também os botões de anterior e próximo */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
            <button className="page-link bg-white text-secondary" onClick={() => setPaginaAtual(paginaAtual - 1)}> <i className="bi bi-arrow-left"></i> Anterior</button>
          </li>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <li key={i} className={`page-item ${paginaAtual === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPaginaAtual(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item  ${paginaAtual === totalPaginas ? "disabled" : ""}`}>
            <button className="page-link bg-white text-secondary" onClick={() => setPaginaAtual(paginaAtual + 1)}>Próximo <i className="bi bi-arrow-right"> </i></button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Alunos;