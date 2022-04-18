const conexao = require("../infraestrutura/conexao");

class Usuario {
    criarUsuarios(usuario, res) {
        const usuarioEhValido = usuario.nome.length >= 5;

        const validacao = [{
            nome: "nome",
            valido: usuarioEhValido,
            mensagem: "O nome do usuario deve ter pelo menos cinco caracteres",
        }, ];

        const erros = validacao.filter((campo) => !campo.valido);
        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const sql = "INSERT INTO Usuarios SET ?";

            conexao.query(sql, usuario, (erro) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(usuario);
                }
            });
        }
    }

    lista(res) {
        const sql = "SELECT * FROM Usuarios";

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorUsuario(id, res) {
        const sql = `SELECT * FROM Usuarios WHERE id=${id}`;

        conexao.query(sql, (erro, resultados) => {
            const usuario = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(usuario);
            }
        });
    }

    altera(id, valores, res) {
        const sql = "UPDATE Usuarios SET ? WHERE id=?";

        conexao.query(sql, [valores, id], (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id });
            }
        });
    }

    deleta(id, res) {
        const sql = "DELETE FROM Usuarios WHERE id=?";

        conexao.query(sql, id, (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ id });
            }
        });
    }

    buscaPorNome(nome, res) {
        const sql = `SELECT * FROM Usuarios WHERE nome=${nome}`;

        conexao.query(sql, (erro, resultados) => {
            const usuario = resultados[0];
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(usuario);
            }
        });
    }
}

module.exports = new Usuario();