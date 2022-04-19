const conexao = require("../infraestrutura/conexao");
const fetch = require("node-fetch");

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

    async adiciona(usuario, res) {
        const urlValida = await this.validarURLFotoPerfil(usuario.urlFotoPerfil);
        const nomeExistente = await this.validarNomeUsuarioNaoUtilizado(
            usuario.nome
        );
        if (nomeExistente) {
            res.status(400).json("Nome ja existente");
        } else {
            if (!urlValida) {
                res.status(400).json("Url inválida");
            } else {
                const sql = "INSERT INTO Usuarios SET ?";

                conexao.query(sql, usuario, (erro, resultado) => {
                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        res.status(200).json(resultado);
                    }
                });
            }
        }
    }

    async validarURLFotoPerfil(fotoPerfil) {
        const regex =
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g;
        var urlValida = regex.test(fotoPerfil);
        let statusUrl;
        if (urlValida) {
            try {
                statusUrl = await fetch(fotoPerfil);
                if (statusUrl.status === 200) {
                    return true;
                } else {
                    return false;
                }
            } catch (erro) {
                return false;
            }
        } else {
            return false;
        }
    }

    validarNomeUsuarioNaoUtilizado(nome) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM usuarios WHERE NOME = ?";
            conexao.query(sql, nome, (erro, resultado) => {
                if (erro) {
                    return reject(erro);
                } else {
                    if (resultado.length > 0) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                }
            });
        });
    }
}

module.exports = new Usuario();