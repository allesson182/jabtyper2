function homeDao(connection){
	this._connection = connection;
}




module.exports = function(){
	return homeDao;
}