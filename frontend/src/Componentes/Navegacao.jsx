
import im1 from "../assets/imagens/imagem1.png"
//Aqui é onde fica o Header do meu projeto, o nome dele está como navegação
//Eu importei e adicionei a logo, e também puxei a cor que estava no fígma
function Navbar() {
  return (
    <nav className="d-flex align-items-center margin-0 padding-0-24px width-100%  px-4 py-3 " style={{ background: "#EA394E" } }>
  <img src={im1} alt="im1" style={{ height: 40, marginRight: 16 }} />
  <h5 className="mb-0 text-white text-2x4 padding-0-16px  ">Gerenciador de cursos</h5>
</nav>
  );
}

export default Navbar;