function FraseDao(connection){
	this._connection = connection;
}

FraseDao.prototype.buscarFrases = function(callback){
	this._connection.query('select * from frases', callback);
}


module.exports = function(){
	return FraseDao;
}