import Repository from '../infrastructure/Repository.js'
const repository = new Repository();

class Lista{
    constructor(idProprietario, nomeProprietario){
        this.id = ''
        this.nome = ''
        this.proprietario = {
            id: idProprietario,
            nome: nomeProprietario
        }
        this.produtos = []
        this.convidados = []
        
    }

    validarNome() {
        if(
            typeof this.nome === 'string' &&
            this.nome.length !== 0 &&
            this.nome.length <= 40)
        {
            return true;
        }
        return false;
    }

    validarEmail(){
        if(
            typeof this.convidados.length <= 40 ||
            this.convidados.length === 0)
        {
            return true
        }
        return false
    }
    static trocaNome(callback, novoNome, idLista){
        console.log(callback)
        console.log(novoNome)
        console.log(idLista)
        let item = {
            id: idLista,
            nome: novoNome,
        }
        let info = JSON.stringify(item);
        fetch('http://listacompras.local/api/lista/altera-nome/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            mode: 'cors',
            body: info
          })
        .then(function(response){
            return response.json()
        })
        .then(function(data){   
            console.log(data)          
            callback()
        })
    }

    criar(callback){
        let lista = new Lista()
        let itemLista = this;
        let info = JSON.stringify(this);
        fetch('http://listacompras.local/api/lista/cadastro/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            mode: 'cors',
            body: info
          })
        .then(function(response){
            return response.json()
        })
        .then(function(data){ 
            lista.id = data
            lista.nome = itemLista.nome
            lista.proprietario = {
                id: itemLista.proprietario.id,
                nome: itemLista.proprietario.nome
            }
            lista.convidados = itemLista.convidados
            lista.produtos = []
            callback(lista)
        })
        
    }

    static deletar(callback, idLista){
        let item = {
            lista: idLista,
        }
        let info = JSON.stringify(item);
        fetch('http://listacompras.local/api/lista/remove/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            mode: 'cors',
            body: info
          })
        .then(function(response){
            return response.json()
        })
        .then(function(data){   
            console.log(data)          
            callback()
        })
    }

    static obter(sucesso, falha, user){
        const usuario = user
        let item = {
            user: usuario.id
        }
        let info = JSON.stringify(item);
        console.log(user, info)
        fetch('http://listacompras.local/api/lista/listar/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            mode: 'cors',
            body: info
          })
        .then(function(response){
            return response.json()
        })
        .then(function(data){            
            if(data)
                sucesso(data)
            else
                falha(data)
        }).catch(function(err){
            falha(err)
        })
    }

}

export default Lista