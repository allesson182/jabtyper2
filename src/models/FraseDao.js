function FraseDao(connection){
	this._connection = connection;
}

FraseDao.prototype.buscarFrases = function(callback){
	this._connection.query('select * from frases', callback);
}
FraseDao.prototype.InserirJogador = function(jogador, dificuldade, tempo, callback){
	this._connection.query('INSERT INTO jogadores values(?, ?, ? )',[jogador, dificuldade, tempo], callback);
}


module.exports = function(){
	return FraseDao;
}