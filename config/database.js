var mysql = require('mysql');

var conexao = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '12345',
		database : 'jabtyper2',
        charset: "utf8_general_ci"
	});
}

module.exports = function () {
	return conexao;
}