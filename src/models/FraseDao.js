function FraseDao(connection){
	this._connection = connection;
}

FraseDao.prototype.buscarFrases = function(dificuldade, callback){
	this._connection.query('select * from frases f WHERE f.dificuldade = ?;', [dificuldade], callback);
}


module.exports = function(){
	return FraseDao;
}