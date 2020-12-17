import React from 'react'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import Toast from '../Toast/index.jsx'

import Usuario from '../../models/Usuario.js'
import Lista from '../../models/Lista.js'

class AdicionarLista extends React.Component{
    
    constructor(props){
        super(props)
        Usuario.obter(usuario => {
            this.state = {
                usuario: usuario,
                lista:  new Lista(usuario.id, usuario.nome),
                validacao: {
                    nomeInvalido: false,
                    emailInvalido: false
                }
            }
        })

        console.log(this.state)
    }

    atualizaNome(e){
        let lista = this.state.lista
        lista.nome = e.target.value
        this.setState({
            lista: lista
        })
    }

    atualizaEmail(e){
        let lista = this.state.lista
        lista.convidados = e.target.value
        this.setState({
            lista: lista
        })
    }

    validar(e){
        let result = '';
        e.preventDefault();
        let lista = this.state.lista
        let validacao = this.state.validacao
        validacao.nomeInvalido = !lista.validarNome()
        validacao.emailInvalido = !lista.validarEmail()
        let mensagem = '';
        if (validacao.emailInvalido && validacao.nomeInvalido) {
            mensagem = 'Nome da lista e e-mail são inválidos.'
        } else if (validacao.emailInvalido) {
            mensagem = 'O e-mail é inválido!'
        } else if (validacao.nomeInvalido) {
            mensagem = 'O nome da lista é inválido!'
        }
        if(mensagem)
            this.props.erro(mensagem)
            
        this.setState({
            validacao: validacao
        });
        
        if(mensagem === ''){
            this.state.lista.criar(this.props.onSubmit)
            const box = document.querySelector('.lp__register')
                            box.classList.toggle('-active');
        }


            
            // this.state.lista.criar((item) => {console.log('Adicionar lista',item)}            
            // this.state.lista.criar(this.props.onSubmit(this.state.lista))
            // console.log("resultado do cadastro 1", this.state.lista.criar())                
            // console.log("resultado do cadastro 2", result, this.state.lista);
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12 lp__register">
                    <div className="lp__registerBox">
                        <div className="form-group">
                            <Label
                                htmlFor="nome"
                                texto="Nome da Lista"
                                valorInvalido={this.state.validacao.nomeInvalido}
                            />
                            <Input 
                                id="nome"
                                placeholder="Nome da lista"
                                maxLength="20"
                                className="form-control"
                                valorInvalido={this.state.validacao.nomeInvalido}
                                onChange={this.atualizaNome.bind(this)}
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor="email"
                                texto="Compartilhar lista com..."
                                valorInvalido={this.state.validacao.emailInvalido}
                            />
                            <Input 
                                id="email"
                                placeholder="email de quem deseja compartilhar"
                                maxLength="20"
                                className="form-control"
                                valorInvalido={this.state.validacao.emailInvalido}
                                onChange={this.atualizaEmail.bind(this)}
                                type="text"
                            />
                        </div>
                        <Button
                            classList="btn btn-primary"
                            texto="Criar Lista"
                            onClick={
                                this.validar.bind(this)      
                            }
                        />
                    </div>
                </div>      
            </div>
        );
    }
}

export default AdicionarLista;