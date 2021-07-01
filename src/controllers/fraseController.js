
module.exports = (app) => {
    const fraseController = {

        getAll: (req, res) => {
            try {
                const connection = app.config.database();
                const daoFrase = new app.src.models.FraseDao(connection);

                daoFrase.buscarFrases((err, result) => {
                    if(err) { 
                        throw err 
                    } else {
                        connection.end();
                        return res.status(200).json(result);
                    }
                })
            } catch (error) {
                console.error(error);
                res.status(500).json("Internal Server Error");
            }
        },
        inserirJogador: (req, res) => {
            try {
                const connection = app.config.database();
                const daoJogador = new app.src.models.FraseDao(connection);
                const jogador = req.body;

                daoJogador.InserirJogador(jogador,(err, result) => {
                    if(err) { 
                        console.log(jogador.jogador);
                        throw err 
                    } else {
                        connection.end();
                        return res.status(200).json(result);
                    }
                })
            } catch (error) {
                console.error(error);
                res.status(500).json("Internal Server Error");
            }
        }, 
        getAllJogadores: (req, res) => {
            try {
                const connection = app.config.database();
                const daoJogadorListagem = new app.src.models.FraseDao(connection);

                daoJogadorListagem.buscarJogadores((err, result) => {
                    if(err) { 
                        throw err 
                    } else {
                        connection.end();
                        return res.status(200).json(result);
                    }
                })
            } catch (error) {
                console.error(error);
                res.status(500).json("Internal Server Error");
            }
        },

    }

    return fraseController;
}