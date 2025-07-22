import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
//Essa é a parte do Login, onde o usuário vai fazer o login
function Login() {
  //Agora eu estou definindo os estados iniciais e as funões que vão ser usadas para alterar eles
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
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
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      {/* Aqui é o card, onde vai aparecer o login */}
      <div className="card p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Login</h2>
        {erro && <div className="alert alert-danger">{erro}</div>}
        {/* OnSubmit significa que quando clicar para entrar, vai chamar a função handlelogin*/}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;