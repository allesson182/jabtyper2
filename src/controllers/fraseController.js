
module.exports = (app) => {
    const fraseController = {

        getAll: (req, res) => {
            try {
                const connection = app.config.database();
                const daoFrase = new app.src.models.FraseDao(connection);

                daoFrase.buscarFrases(1, (err, result) => {
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
        }

    }

    return fraseController;
}