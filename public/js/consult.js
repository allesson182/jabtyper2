
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