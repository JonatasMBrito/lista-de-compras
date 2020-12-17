import Repository from '../infrastructure/Repository.js'
const repository = new Repository();

class Produto{
    constructor(){
        this.nome = ''
        this.qtde = ''
        this.marca = ''
        this.tamanho = ''
        this.preco = ''   
        this.infos = '' 
    }

    salvar(callback){
        console.log("Salvar", this, callback)
        repository.salvar(this, callback)
    }

    login(callback){
        repository.obter(this, callback, () => {
            console.log('Erro ao fazer solicitação');
        })
    }

    static obter(sucesso, falha){
        repository.obter(json => {
            let produto = new Produto()
            produto.nome = json.nome
            produto.email = json.email
            produto.senha = json.senha
            sucesso(produto)
        }, falha)
    }

    static removerProduto(callback, idLista, nomeProduto){
        let item = {
            lista: idLista,
            produtoNome: nomeProduto,
        }
        let info = JSON.stringify(item);
        console.log(item)
        fetch('http://listacompras.local/api/lista/remove-produto/', {
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
            callback()
        }).catch(function(err){
            console.log(err)
        })
    }

    static atualizaProduto(callback, idLista, nomeProduto, produto){
        console.log(callback, idLista, nomeProduto, produto)
        let item = {
            lista: idLista,
            produtoNome: nomeProduto,
            produtoMarca: produto.marca,
            produtoQtde: produto.qtde,
            produtoTamanho: produto.tamanho,
            produtoPreco: produto.preco
        }
        let info = JSON.stringify(item);
        fetch('http://listacompras.local/api/lista/atualizar-produto/', {
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
        .then(function(){ 
            callback()
        }).catch(function(err){
            console.log(err)
        })
    }

    static statusCompra(callback, idLista, nomeProduto, usuario, status){
        let item = {
            lista: idLista,
            produtoNome: nomeProduto,
            usuarioId: usuario.id,
            usuarioName: usuario.nome,
            comprado: status
        }
        let info = JSON.stringify(item);
        console.log(item)
        fetch('http://listacompras.local/api/lista/comprar-produto/', {
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
            callback()
        }).catch(function(err){
            console.log(err)
        })
    }

    criar(callback, idLista){
        let produto = new Produto()
        let item = this;
        item.lista = idLista
        let info = JSON.stringify(item);
        fetch('http://listacompras.local/api/lista/adiciona-produto/', {
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
            produto.nome = item.nome
            produto.qtde = item.qtde
            produto.marca = item.marca
            produto.tamanho = item.tamanho
            produto.preco = item.preco
            produto.infos = item.infos

            callback(produto)
        }).catch(function(err){
            console.log(err)
        })
        
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

    validarMarca(){
        if(
            (
                typeof this.marca === 'string' &&
                this.marca.length !== 0 &&
                this.marca.length <= 40            
            ) ||  
            this.qtde.length == 0
        ){
            return true;
        }
        return false;
    }

    validarQtde(){
        if(
            (
                typeof this.qtde === 'string' &&
                this.qtde.length !== 0
            ) ||  
            this.qtde.length == 0
        ){
            return true
        }
        return false
    }

    validarTamanho(){
        if(
            (
                typeof this.tamanho === 'string' &&
                this.tamanho.length !== 0 &&
                this.tamanho.length <= 40
            ) ||  
            this.tamanho.length == 0
        ){
            return true;
        }
        return false;
    }

    validarPreco(){
        if(
            (
                typeof this.preco === 'string' &&
                this.preco.length !== 0 &&
                this.preco.length <= 40
            ) ||  
            this.preco.length == 0
        ){
            return true;
        }
        return false;
    }
}
export default Produto;