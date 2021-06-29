async function connect(){
    if (global.connection && global.connection !== 'disconnected')
        return global.connection;
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jabtyperv2',
        password: '12345'

    })
    console.log("Conexão Funcionou")
    global.connection = connection;
    return connection;
}
async function getFrases(){
    const conn = await connect();
    const [rows] = await conn.query('select * from frases;');
    return  rows;

}
async function getFrasesPorDificuldade(frases){
    const conn = await connect();
    const [rows] = await conn.query('select * from frases f WHERE f.dificuldade = ? ;', [frases.dificuldade] );
    return  rows;

}
async function insertPLayerScore(jogadores){
    const conn = await connect();
    const sql = ('INSERT INTO jogadores(nome, dificuldade, pontuacao) VALUES (?, ?, ?);');
    const values = [jogadores.nome, jogadores.dificuldade, jogadores.pontuacao]
    await conn.query(sql, values);

}
module.exports = {getFrases, insertPLayerScore}