module.exports = (app) => {
    const homeController = {

        paginaHome: function(req, res) {
            res.render('index');
        }

    }

    return homeController;
}