import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarAlunoPorId, atualizarAluno, deletarAlunoPorId } from "../funcoes/AlunoAPI";
import { buscarEndereco, formatarCelular, formatarCpf, formatarCep } from "../funcoes/utils";
import { buscarCursos } from "../funcoes/CursosAPI";
import { buscarMatriculas, atualizarMatricula, deletarMatricula, criarMatricula } from "../funcoes/AlunoCursoAPI";

function AlunoDetalhes() {
  //Primeiro eu peguei o id do aluno, que vem como parametro na rota
  const { id } = useParams();
  //Aqui eu defini todos os estados que eu vou usar, e também as funções capazes de modificar esses estados
  const [aluno, setAluno] = useState(null);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [celular, setCelular] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [pais, setPais] = useState("");
  const [cursosAluno, setCursosAluno] = useState([]);
  const [todosCursos, setTodosCursos] = useState([]);
  const [cursosDisponiveis, setCursosDisponiveis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Aqui vou buscar os dados do aluno pelo id dele
    async function fetchAluno() {
      try {
        const response = await buscarAlunoPorId(id);
        setAluno(response);
        setNome(response.nome || "");
        setDataNascimento(response.dataNascimento || "");
        setCpf(response.cpf || "");
        setGenero(response.genero || "");
        setEmail(response.email || "");
        setCep(response.cep || "");
        setCelular(response.celular || "");
        setNumero(response.numero || "");
        setComplemento(response.complemento || "");
        setBairro(response.bairro || "");
        setCidade(response.cidade || "");
        setUf(response.uf || "");
        //Aqui eu vou botar o Brasil como padrão
        setPais(response.pais || "Brasil");
        setLogradouro(response.logradouro || "");
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        alert("Erro ao buscar aluno.");
      }
    }
    fetchAluno();
  }, [id]);
  useEffect(() => {
    async function fetchTodosCursos() {
      const response = await buscarCursos();
      setTodosCursos(response);
    }
    fetchTodosCursos();
  }, [])

  useEffect(() => {
    //Aqui eu vou buscar os cursos que um aluno está matriculado
    async function fetchCursosAluno() {
      const response = await buscarMatriculas(id);
      //Agora vou setar os cursos que o aluno já está matriculado no meu estado
      setCursosAluno(
        response.map(c => ({
          cursoId: c.id,
          status: c.status || "em_andamento",
          data_conclusao: c.data_conclusao || ""
        }))
      );
    }
    if (id) fetchCursosAluno();
  }, [id]);

  useEffect(() => {
    //Agora eu vou buscar os cursos que o aluno não está matriculado
    //Para quando eu usar o select para adicionar um curso, eu não mostrar o que ele já está matriculado 
    const idsMatriculados = cursosAluno.map(c => c.cursoId);
    const disponiveis = (todosCursos || []).filter(curso => !idsMatriculados.includes(curso.id));
    setCursosDisponiveis(disponiveis);
  }, [todosCursos, cursosAluno]);

  async function handleSubmit(e) {
    //Essa função como o nome mesmo já diz, é para lidar com o submit do formulário
    e.preventDefault();
    try {
      // aqui vai atualizar os dados do aluno pela API de alunos, usando o put
      await atualizarAluno(id, {
        nome,
        dataNascimento,
        cpf,
        genero,
        email,
        cep,
        celular: celular.replace(/\D/g, ''),
        logradouro,
        bairro,
        cidade,
        uf,
        complemento,
        numero,
        pais
      });

      // aqui eu já vou buscar as matrículas atuais do aluno para comparar
      const responseCursos = await buscarMatriculas(id);
      const matriculasAtuais = responseCursos.map(c => c.id);
      // Atualiza as matrículas
      for (const curso of cursosAluno) {
        if (!curso.cursoId) continue;
        const cursoId = curso.cursoId;
        const jaMatriculado = matriculasAtuais.includes(cursoId);

        if (jaMatriculado) {
          // Se já está matriculado, eu vou apenas atualizar
          await atualizarMatricula(id, curso.cursoId, {
            status: curso.status,
            data_conclusao: curso.data_conclusao || null
          });
        } else {
          // Se não está matriculado, eu vou criar uma nova matrícula
          await criarMatricula(id, curso.cursoId);
        }
      }
      //Se der tudo certo sobe um alert de Sucesso
      alert("Dados do aluno e cursos atualizados com sucesso!");
    } catch (error) {
      //Se não, ele vai cair no catch e vai mostrar um alert de erro
      alert("Erro ao salvar dados do aluno ou cursos.");
    }
  }

  useEffect(() => {
    //Essa aqui é a API do CEP, ela é uma API pública, e eu estou usando ela para buscar o endereço do aluno
    async function buscarEnderecoEffect() {
      if (cep.length === 9) {
        //Se o CEP tiver 8 letras ele vai entrar no try
        try {
          //Aqui eu vou fazer um fetch para a API do CEP
          const data = await buscarEndereco(cep);
          //Se vier tudo certo, ela vai entrar no if
          if (!data.erro) {
            //Eu vou setar o país, o logradouro, o bairro, a cidade e a UF, no caso não vou adicionar o complemento e o número
            //O complemento e o número, quem adiciona vai ser o usuário, se eu botar  aqui, eles sempre vão ser nulos
            //Por que essa API normalmente retorna eles nulos
            setPais(data.pais || "Brasil");
            setLogradouro(data.logradouro || "");
            setBairro(data.bairro || "");
            setCidade(data.localidade || "");
            setUf(data.uf || "");
          }
        } catch (error) {
          //Como sempre, se der algum erro, ele vai cair no catch, aí fica bem mais fácil de achar o erro
          console.error("Erro ao buscar endereço:", error);
          alert("Erro ao buscar endereço. Por favor, tente novamente.");

        }
      }
    }
    buscarEnderecoEffect();
  }, [cep]);

  async function handleRemoverCurso(idx, cursoId) {
    try {
      //Aqui é quando for deletar o curso
      //Normalmente, como sempre, handle(Lidar com)
      await deletarMatricula(id, cursoId);
      //Agora que já removi do backend, eu vou remover do frontend
      setCursosAluno(cursosAluno.filter((_, i) => i !== idx));
      //Esse filter, eu vou usar para remover o curso, cujo id é igual ao idx
      //Ele vai retornar um array com todos os cursos com id diferente de idx
    } catch (error) {
      //Se der erro ele cai aqui
      alert("Erro ao remover curso.");
    }
  }

  async function handleDeletarAluno() {
    //Essa função vai ser para deletar o aluno
    try {
      await deletarAlunoPorId(id);
      //Se der tudo certo ele vai retornar um alert de sucesso
      alert("Aluno deletado com sucesso!");
      //E depois vai voltar para a página de alunos
      navigate("/alunos");
    } catch (error) {
      //Se cair no catch vai aparecer um alert de erro
      alert("Erro ao deletar aluno.");
    }
  }

  if (!aluno) return <div>Carregando...</div>;
  //Se não tiver aluno, ele vai retornar um div com o texto carregando...

  return (
    //Aqui é o que meu usuário vai ver
    <div className="container mt-5 position-relative">

      <div className="d-flex align-items-center justify-content-between mb-4">
        {/*Aqui é o nome do aluno que vai aparecer no topo da página*/}
        <h2 className="mb-0">{aluno.nome}</h2>
        <i
          //Usando o ícone de lixeira do bootstrap
          className="bi bi-trash lixeira "
          style={{ color: "#EA394E", fontSize: 28, cursor: "pointer" }}
          onClick={() => {
            if (window.confirm("Tem certeza que deseja deletar esse aluno?")) {
              handleDeletarAluno();
            }
          }}
        />
      </div>
      {/*Aqui é o formulário, onde eu vou editar os dados do aluno*/}
      <form onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col-md-4 mb-3">
            <label>Nome e Sobrenome*</label>
            <input className="form-control text-center" value={nome} onChange={e => setNome(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Celular*</label>
            <input className="form-control text-center" value={formatarCelular(celular)} onChange={e => setCelular(e.target.value.replace(/\D/g, ''))} placeholder="(xx) xxxxx-xxxx" />
          </div>
          <div className="col-md-4 mb-3">
            <label>Data de nascimento*</label>
            <input className="form-control text-center" type="date" value={(dataNascimento)} onChange={e => setDataNascimento(e.target.value)} />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-4 mb-3">
            <label>CPF*</label>
            <input className="form-control text-center" value={formatarCpf(cpf)} onChange={e => setCpf(e.target.value.replace(/\D/g, ''))} placeholder="xx.xxx.xxx-xx" />
          </div>
          {/* No caso do Gênero eu utilizei um select com 3 opções possíveis */}
          <div className="col-md-4 mb-3">
            <label>Gênero*</label>
            <select
              className="form-control text-center"
              value={genero}
              onChange={e => setGenero(e.target.value)}
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Prefiro não informar">Prefiro não informar</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Email*</label>
            <input className="form-control text-center" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        <h5>Localização</h5>
        <div className="row mb-2  ">
          <div className="col-md-4 mb-3">
            <label>CEP*</label>
            <input className="form-control text-center" value={formatarCep(cep)} onChange={e => setCep(e.target.value.replace(/\D/g, ''))} placeholder="xx.xxx-xxx" />
          </div>
          <div className="col-md-4 mb-3">
            <label>País*</label>
            <input className="form-control text-center" value={pais} onChange={e => setPais(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Rua</label>
            <input className="form-control text-center" value={logradouro} onChange={e => setLogradouro(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Bairro*</label>
            <input className="form-control text-center" value={bairro} onChange={e => setBairro(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Cidade*</label>
            <input className="form-control text-center" value={cidade} onChange={e => setCidade(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label>UF*</label>
            <input className="form-control text-center" value={uf} onChange={e => setUf(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Complemento</label>
            <input className="form-control text-center" value={complemento} onChange={e => setComplemento(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label>Número</label>
            <input className="form-control text-center" value={numero} onChange={e => setNumero(e.target.value)} />
          </div>

        </div>


        <h5>Cursos</h5>
        {/* Aqui eu vou mapear os cursos que o aluno está matriculado */}
        {cursosAluno.map((curso, idx) => (
          <div className="row align-items-center mb-4 mt-4" key={idx}>
            <div className="col-md-5">
              <label>Nome do curso</label>
              <select
                //Aqui eu estou usando o select para selecionar o curso que o aluno está matriculado
                className="form-control"
                value={curso.cursoId}
                onChange={e => {
                  const novos = [...cursosAluno];
                  novos[idx].cursoId = e.target.value;
                  setCursosAluno(novos);
                }}
              >
                {/* Aqui eu estou usando o option para selecionar o curso que o aluno vai estar se matriculando*/}
                <option value="">Selecione...</option>
                {curso.cursoId && !cursosDisponiveis.some(c => c.id === curso.cursoId) && (todosCursos || []).find(c => c.id === curso.cursoId) && (
                  <option value={curso.cursoId}>
                    {(todosCursos || []).find(c => c.id === curso.cursoId)?.nome}
                  </option>
                )}
                {cursosDisponiveis.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label>Status</label>
              <select
                className="form-control"
                value={curso.status}
                onChange={e => {
                  const novos = [...cursosAluno];
                  novos[idx].status = e.target.value;
                  setCursosAluno(novos);
                }}
              >
                <option value="em_andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
                <option value="trancado">Trancado</option>
                <option value="encerrado">Encerrado</option>
              </select>
            </div>

            <div className="col-md-4 d-flex align-items-center justify-content-between">
              <label>Data de conclusão</label>
              <input
                type="date"
                className="form-control"
                value={curso.data_conclusao}
                onChange={e => {
                  const novos = [...cursosAluno];
                  novos[idx].data_conclusao = e.target.value;
                  setCursosAluno(novos);
                }}
              />
              <i className="bi bi-trash" style={{ color: "#EA394E", fontSize: 20, cursor: "pointer" }} onClick={() => { if (window.confirm("Tem certeza que deseja deletar esse curso?")) handleRemoverCurso(idx, curso.cursoId) }}></i>
            </div>


          </div>
        ))}
        <div className="row mb-3">
          <div className="col-md-12 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() =>
                setCursosAluno([...cursosAluno,
                { cursoId: "", status: "em_andamento", data_conclusao: "" }
                ])
              }
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Voltar
          </button>
          <button
            type="submit"
            className="btn btn-danger"
          >
            Salvar
          </button>

        </div>
      </form>
    </div>
  );
}

export default AlunoDetalhes;