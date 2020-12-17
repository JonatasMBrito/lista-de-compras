import Repository from '../infrastructure/Repository.js'
import Lista from './Lista'
const repository = new Repository();

class Usuario{
    constructor(){
        this.id = ''
        this.nome = ''
        this.email = ''
        this.senha = ''
    }

    salvar(callback){
        console.log("Salvar", this, callback)
        let item = {
            nome: this.nome,
            email: this.email,
            senha: this.senha
        }
        let info = JSON.stringify(item);
        fetch('http://listacompras.local/api/usuario/cadastro', {
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
            item.id = data.$id;
            console.log(item);      
            repository.salvar(item, callback)
        })
    }

    login(callback, error){
        let item = {
            nome: this.nome,
            email: this.email,
            senha: this.senha
        }
        let info = JSON.stringify(item);
        fetch('http://listacompras.local/api/usuario/login', {
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
            console.log(data.id)
            if(data.id){
                let usuario = new Usuario()
                usuario.nome = data.nome
                usuario.email = data.email
                usuario.senha = data.senha
                usuario.id    = data.id                    
                repository.salvar(usuario, callback)
            }else{
                error('Usuário e senha não localizados!')
            }
        })
    }

    static obter(sucesso, falha){
        repository.obter(json => {
            let usuario = new Usuario()
            usuario.nome = json.nome
            usuario.email = json.email
            usuario.senha = json.senha
            usuario.id    = json.id
            sucesso(usuario)
        }, falha)
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
        let usuario = this.email.substring(0, this.email.indexOf("@"))
        let dominio = this.email.substring(this.email.indexOf("@")+ 1, this.email.length)
 
        if ((usuario.length >=1) &&
            (dominio.length >=3) && 
            (usuario.search("@")==-1) && 
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) && 
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&      
            (dominio.indexOf(".") >=1)&& 
            (dominio.lastIndexOf(".") < dominio.length - 1))
        {
            return true
        }
        return false
    }
    validarSenha(){
        if(
            typeof this.senha === 'string' &&
            this.senha.length !== 0 &&
            this.senha >= 8)
        {
            return true
        }
        return false
    }
}
export default Usuario;