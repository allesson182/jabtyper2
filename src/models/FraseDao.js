function FraseDao(connection){
	this._connection = connection;
}

FraseDao.prototype.buscarFrases = function(dificuldade, callback){
	this._connection.query('select * from frases f WHERE f.dificuldade_frase = ?;', [dificuldade], callback);
}


module.exports = function(){
	return FraseDao;
}