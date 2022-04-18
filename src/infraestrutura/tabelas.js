class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarUsuarios();
    }
    criarUsuarios() {
        const sql =
            "CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT, nome varchar(50), urlFotoPerfil text, PRIMARY KEY(ID))";

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            } else {
                console.log("Tabela Usuarios criada com sucesso");
            }
        });
    }
}

module.exports = new Tabelas();