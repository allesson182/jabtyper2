
function getFrases() {
    return new Promise((resolve, reject) => {
        try {
            fetch('http://localhost:3000/frases', {
            method: 'get'
            }).then((response) => {
                response.json().then(function(data) {
                    resolve(data);
                });
            })
        } catch(err) {
            reject(reject)
        }
        
    });
}

function getJogador() {
    return new Promise((resolve, reject) => {
        try {
            fetch('http://localhost:3000/jogador', {
            method: 'get'
            }).then((response) => {
                response.json().then(function(data) {
                    resolve(data);
                });
            })
        } catch(err) {
            reject(reject)
        }
        
    });
}

function inserirJogador(body) {
    return new Promise((resolve, reject) => {
        try {
            fetch('http://localhost:3000/inserir', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            }).then((response) => {
                response.json().then(function(data) {
                    resolve(data);
                });
            })
        } catch(err) {
            reject(reject)
        }
        
    });
}