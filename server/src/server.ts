import express from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";

// Instancia a API
const app = express();

// Habilita quem pode acessar a aplicação
app.use(cors());

// Faz expor os arquivos estáticos do diretório
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

// Faz a API entender JSON
app.use(express.json());

// Importa as rotas
app.use(routes);

// App roda na porta 3333
app.listen(3333);
