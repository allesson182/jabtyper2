
module.exports = (app) => {
    const { fraseController } = app.src.controllers;
    app.get('/frases', fraseController.getAll);
    app.post('/inserir', fraseController.inserrir_jogador);
};