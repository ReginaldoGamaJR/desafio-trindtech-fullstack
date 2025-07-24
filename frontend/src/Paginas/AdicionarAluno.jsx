
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
//Aqui em adicionar alunos, é praticamente a mesma coisa que no aluno detalhes, mas com a diferença de que aqui eu não vou buscar os dados do aluno, e sim criar um novo aluno
//Também não vou ter a opção de deletar alguém ou de matricular alguém em um curso, apenas criar um novo aluno
function AdicionarAluno() {
    //Aqui eu vou definir todos os estados e as funções para alterar eles
    const navigate = useNavigate();
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
    const [pais, setPais] = useState("Brasil");
    
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await api.post("/alunos", {
          nome,
          dataNascimento,
          cpf,
          genero,
          email,
          cep,
          celular,
          logradouro,
          bairro,
          cidade,
          uf,
          complemento,
          numero,
          pais
        });
        alert("Aluno cadastrado com sucesso!");
        navigate("/alunos");
      } catch (error) {
        alert("Erro ao cadastrar aluno.");
      }
    }
    useEffect(() => {
        async function buscarEndereco() {
          if (cep.length === 8) {
            try {
              const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
              const data = await response.json();
              if (!data.erro) {
                setPais(data.pais || "Brasil");
                setLogradouro(data.logradouro || "");
                setBairro(data.bairro || "");
                setCidade(data.localidade || "");
                setUf(data.uf || "");
              }
            } catch (error) {
              console.error("Erro ao buscar endereço:", error);
              alert("Erro ao buscar endereço. Por favor, tente novamente.");
    
            }
          }
        }
        buscarEndereco();
      }, [cep]);
  
    return (
      <div className="container mt-5">
        <h1>Novo Aluno</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label>Nome*</label>
              <input className="form-control" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div className="col-md-6 mb-3">
              <label>Celular*</label>
              <input className="form-control" value={celular} onChange={e => setCelular(e.target.value)} required />
            </div>
            <div className="col-md-3 mb-3">
              <label>Data de nascimento*</label>
              <input className="form-control" type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
            </div>
            <div className="col-md-3 mb-3">
              <label>CPF*</label>
              <input className="form-control" value={cpf} onChange={e => setCpf(e.target.value)} required />
            </div>
            <div className="col-md-3 mb-3">
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
            <div className="col-md-6 mb-3">
              <label>Email*</label>
              <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>
          <h5>Localização</h5>
          <div className="row mb-2">
            <div className="col-md-4 mb-3">
              <label>CEP*</label>
              <input className="form-control" value={cep} onChange={e => setCep(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>País*</label>
              <input className="form-control" value={pais} onChange={e => setPais(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Rua</label>
              <input className="form-control" value={logradouro} onChange={e => setLogradouro(e.target.value)} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Bairro*</label>
              <input className="form-control" value={bairro} onChange={e => setBairro(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Cidade*</label>
              <input className="form-control" value={cidade} onChange={e => setCidade(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>UF*</label>
              <input className="form-control" value={uf} onChange={e => setUf(e.target.value)} required />
            </div>
            <div className="col-md-4 mb-3">
              <label>Complemento</label>
              <input className="form-control" value={complemento} onChange={e => setComplemento(e.target.value)} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Número</label>
              <input className="form-control" value={numero} onChange={e => setNumero(e.target.value)} />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/alunos")}>
              Voltar
            </button>
            <button type="submit" className="btn btn-danger">
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default AdicionarAluno;