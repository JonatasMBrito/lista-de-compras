class Repository {    
    constructor() {
        this.key = 'TC-lista-de-compras';
    }
    salvar(json,callback) {        
        let data = JSON.stringify(json)
        window.localStorage.setItem(this.key,data)
        callback(json)
    }
    obter(sucesso,falha) {        
        let data = window.localStorage.getItem(this.key);        
        let json = JSON.parse(data);
        if (json)
            sucesso(json);
        else
            falha();
    }
    // salvar(json,callback) {
    //     let user = JSON.stringify(json);
    //     // window.localStorage.setItem(this.key,data);
    //     fetch('http://listacompras.local/api/usuario/cadastro', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //         },
    //         mode: 'cors',
    //         body: user
    //       })
    //     .then(function(response){
    //         return response.json()
    //     })
    //     .then(function(data){
    //         console.log(data)
    //         console.log('OK');
    //         callback()
    //     }).catch(function(err){
    //         console.log(err);
    //         console.log(err.code, err.message)
    //     })
    // }

    // obter(json, sucesso, falha) {        
    //     let user = JSON.stringify(json);
    //     // window.localStorage.setItem(this.key,data);
    //     fetch('http://listacompras.local/api/usuario/login', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //         },
    //         mode: 'cors',
    //         body: user
    //       })
    //     .then(function(response){
    //         return response.json()
    //     })
    //     .then(function(data){
    //         if(data)
    //             sucesso(data)
    //         else
    //             falha
    //     }).catch(function(err){
    //         falha
    //     })
    // }
}

export default Repository; 