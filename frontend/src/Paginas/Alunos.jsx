import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { buscarTodosAlunos } from "../funcoes/AlunoAPI";
import { gerarPaginas } from "../funcoes/utils";
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
  const [totalPaginas, setTotalPaginas] = useState(1);
  const navigate = useNavigate();
  const [ordenarData, setOrdenarData] = useState(false); 
  const [totalAlunos, setTotalAlunos] = useState(0);

  useEffect(() => {
    async function fetchAlunos() {
      //Aqui é onde eu vou buscar os alunos no meu backend
      try {
        //Primeiro vou buscar o token, pq sem ele não consigo chegar ao meu backend
        const token = localStorage.getItem("token");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //Após pegar o token, eu uso um get para pegar alunos, e jogar eles dentro do response
        const response = await buscarTodosAlunos(paginaAtual, busca);
        //Quando eu peguei os alunos, eu jogo eles dentro do setAlunos, que é a única função que é capaz de alterar o estado de alunos
        setAlunos(response.alunos);
        setTotalPaginas(response.meta.totalPaginas);
        setTotalAlunos(response.meta.totalAlunos);

        // forEach, como o nome já diz, para cada aluno, eu vou buscar os cursos que ele está fazendo
        //Esses cursos eu vou encontrar dentro da tabela relacional, que é a tabela que relaciona alunos e cursos
        response.alunos.forEach(async (aluno) => {
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
  }, [paginaAtual, busca]);
  //Aqui eu só vou ordernar eles mesmo, preparar essa função para funcionar no onclick das setinhas
    const alunosOrdenados = [...alunos].sort((a, b) => {
    if (ordenarData) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });
  return (
    //Aqui, é o que vai aparecer na tela para a pessoa ver
    <div className="container">

      <div className="d-flex align-items-center mt-5 mb-4" style={{ gap: 16 }}>

        <div className="input-group" style={{ height: 48, flexGrow: 1 }}>
          <input
          //Aqui é a barra de buscar por alunos
            type="text"
            className="form-control "
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
            <i className="bi bi-search lupinha" style={{ color: "#EA394E", fontSize: 22, cursor: "pointer" }} onClick={() => setBusca("")}></i>
          </span>
        </div>
        {/* Esse butão é o de adicionar, o ícone dele também peguei no site de icones do bootstrap */}
        <button
          className=" bg-white text-center d-flex align-items-center justify-content-center BotaoAdicionar"
          style={{
            height: 48,
            borderRadius: 12,
            minWidth: 140,
            fontSize: 16,
            fontWeight: 500,
            gap: 8,
          }}
          onClick={() => navigate("/adicionar-aluno")}
        >
          <i className="bi bi-person-plus " style={{ color: "#EA394E", fontSize: 22 }}></i>
          Adicionar
        </button>
      </div>

      {/* Aqui é efetivamente a tabela, tanto que usei o th e td e tbody*/}
      <div className="card p-3 border border-white padding-0 ">
        <div className="table-responsive">
          <table className="table align-middle h-30 borderless">
            <thead>
              <tr>
                <th className="">Data de cadastro <i className="bi bi-arrow-down-up setasCimaBaixo" style={{cursor: "pointer"}} onClick={() => setOrdenarData(!ordenarData)}></i></th>
                <th className="text-start tabelaNome w-25">Nome</th>
                <th className="">Estado</th>
                <th>Cursos</th>
              </tr>
            </thead>
          <tbody>
            {/* Agora vou utilizar um map, para pegar de cada aluno da página, o atributo que eu quero, no caso quero o 
            createdAt, nome, uf para isso estou usando o aluno.id como chave, e também na data, tive que utilizar toLocaleDateString pt-br para formatar*/}
            {alunos.map(aluno => (
              <tr key={aluno.id}>
                <td className="DataCadastro">{new Date(aluno.createdAt).toLocaleDateString('pt-BR')}</td>
                <td style={{cursor: "pointer"}} className="NomeAluno text-start " onClick={() => navigate(`/alunos/${aluno.id}`) }>{aluno.nome}</td>
                <td className="text-center">{aluno.uf}</td>
                <td className="CursosTodos">
                  <div className="CursosAluno">
                {(cursosPorAluno[aluno.id] || []).slice(0, 2).map(curso => (
                    <span key={curso.id} className="badge bg-muted text-info border border-info me-1 CursosAlunoCursos text-center">{curso.nome}</span>
                  ))}
                {(cursosPorAluno[aluno.id] || []).length > 2 && (
                <span className="CursosAlunoCursos badge-overflow">
                  +{(cursosPorAluno[aluno.id] || []).length - 2}
                </span>
                )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {/* Aqui é a paginação, onde eu vou mostrar as páginas, e também os botões de anterior e próximo */}
      <nav >
        <ul className="pagination justify-content-center">
          <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
            <button className="page-link bg-white text-secondary borderless" onClick={() => setPaginaAtual(paginaAtual - 1)}> 
              <i className="bi bi-arrow-left"></i> Anterior</button>
          </li>
          {gerarPaginas(paginaAtual, totalPaginas).map((pagina, index) => (
            <li key={index} className={`page-item ${paginaAtual === pagina ? "active" : ""}`}>
              {pagina === '...' ? (
          <span className="page-link disabled">...</span>
        ) : (
          <button className="page-link" onClick={() => setPaginaAtual(pagina)}>{pagina}</button>
        )}
            </li>
          ))}
          <li className={`page-item  ${paginaAtual === totalPaginas ? "disabled" : ""}`}>
            <button className="page-link bg-white text-secondary " onClick={() => setPaginaAtual(paginaAtual + 1)}>Próximo
               <i className="bi bi-arrow-right"> </i></button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Alunos;