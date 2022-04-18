const usuarios = require("../models/usuarios");

module.exports = (app) => {
    app.get("/usuarios", (req, res) => {
        usuarios.lista(res);
    });

    app.get("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);

        usuarios.buscaPorUsuario(id, res);
    });

    app.get("/usuarios/nome/:nome", (req, res) => {
        const nome = req.params.id;

        usuarios.buscaPorNome(nome, res);
    });

    app.post("/usuarios", (req, res) => {
        const atendimento = req.body;

        usuarios.criarUsuarios(atendimento, res);
    });

    app.put("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        usuarios.altera(id, valores, res);
    });

    app.delete("/usuarios/:id", (req, res) => {
        const id = parseInt(req.params.id);

        usuarios.deleta(id, res);
    });
};