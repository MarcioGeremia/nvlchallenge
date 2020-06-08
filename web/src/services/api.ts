import axios from "axios";
// url que vai se repetir em todas as requisições ->
// não dá pra fazer pela biblioteca padrão do react (fetch)
const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
