import axios from "axios";
//Aqui é onde eu vou criar a passagem para o meu backend
const api = axios.create({
  //Esse localhost é o do meu backend
  baseURL: "http://localhost:3333",
});
//Aqui eu vou pegar o token e passar para o meu backend
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default api;