import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
//Essa é a parte do Login, onde o usuário vai fazer o login
function Login() {
  //Agora eu estou definindo os estados iniciais e as funões que vão ser usadas para alterar eles
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  //Refatorando, achei melhor existir a função de mostrar a senha, pois assim eu posso usar o bi-eye-slash e o bi-eye
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();
  //HandleLogin é a função que vai lidar com o login, assim como o nome já diz
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      //Aqui eu vou criar uma sessão utilizando o post, e vou passar o email e a senha
      const response = await api.post("/sessoes", { email, password: senha });
      //Após criar a sessão vou pegar o token que foi criado
      const token = response.data.token;
      //Vou salvar ele no localStorage
      localStorage.setItem("token", token);
      //Agora vou passar o token para o meu backend, e o midleware vai verificar se o token é válido
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //Depois de verificar, vai redirecionar direto para a página de alunos
      navigate("/alunos");
    } catch (err) {
      //Se algo der errado, eu vou mostrar que ele botou o email ou senha errado
      setErro("E-mail ou senha inválidos!");
    }
  };

  return (
    //Aqui, assim como na de alunos é o que vai aparecer na tela
    <div className="container d-flex flex-column align-items-center justify-content-center " style={{ minHeight: "80vh" }}>
      {/* Aqui é o card, onde vai aparecer o login */}
      <div className="card p-4 quadradoDoLogin" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Login</h2>
        {erro && <div className="alert alert-danger">{erro}</div>}
        {/* OnSubmit significa que quando clicar para entrar, vai chamar a função handlelogin*/}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input type="email" className="form-control text-center" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            {/* Aqui vou usar o type para fazer a pergunta, mostrarsenha é true? se for então o type vai ser text, se não então o type vai ser password */}
            {/* Quando é text nós vemos, se for password nós não vemos*/}
            <input type={mostrarSenha ? "text" : "password"} className="form-control text-center" value={senha} onChange={e => setSenha(e.target.value)}  required />
            {/* Aqui eu vou usar o i para mostrar o bi-eye-slash ou o bi-eye, e vou usar o onClick para mudar o estado de mostrarSenha */}
            <i className={`bi ${mostrarSenha ? "bi-eye-slash" : "bi-eye"} olhinho`} onClick={() => setMostrarSenha(!mostrarSenha)} style={{cursor: "pointer"}}></i>
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;