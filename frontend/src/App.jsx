import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alunos from "./Paginas/Alunos.jsx";
import Login from "./Paginas/Login.jsx";
import BarraDeNavegacao from "./Componentes/Navegacao.jsx";
import AlunoDetalhes from "./Paginas/AlunoDetalhes.jsx";
import AdicionarAluno from "./Paginas/AdicionarAluno.jsx";
//Aqui é o esqueleto principal do gerenciador
function App() {
//Eu vou usar o router, para fazer a navegação
  return (
    <Router>
      {/*Eu boto a barraDeNavegação aqui, pq ela vai aparecer em todas as páginas como um header*/}
      <BarraDeNavegacao />
      <Routes>
        {/*Aqui é onde eu vou definir as rotas, e o que vai aparecer em cada uma delas*/}
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adicionar-aluno" element={<AdicionarAluno />} />
        {/*Essa é a página para ver e atualizar os detalhes de um aluno em específico*/}
        <Route path="/alunos/:id" element={<AlunoDetalhes/>} />
        {/*Essa rota de asterisco é a rota default*/}
        <Route path="*" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App
