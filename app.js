const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

consign({}) // Possibilita injetar modulos dependentes em uma variável
.include('src/models')
.then('config')
.then('src/controllers')
.then('src/routes')
.into(app)
;

const port = process.env.PORT ? process.env.PORT : 3000;
app.set('port', port);
app.listen(app.get('port'), function() {
    console.log(`server running on port ${port}`);
});