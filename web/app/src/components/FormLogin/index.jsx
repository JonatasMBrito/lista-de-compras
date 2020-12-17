import React from 'react'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import Toast from '../Toast';
import { Link } from 'react-router-dom'

import Usuario from '../../models/Usuario.js'

class FormLogin extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            usuario: new Usuario(),
            validacao: {
                emailInvalido: false,
                senhaInvalida: false
            }
        }
    }

    atualizarEmail(e){
        let usuario = this.state.usuario; // Resgata
        usuario.email = e.target.value; // Atualiza
        this.setState({
            usuario: usuario // Salva
        })
    }

    atualizarSenha(e){
        let usuario = this.state.usuario; // Resgata
        usuario.senha = e.target.value; // Atualiza
        this.setState({
            usuario: usuario // Salva
        })
    }

    validar(e){
        e.preventDefault();
        let usuario = this.state.usuario;
        let validacao = this.state.validacao;
        validacao.emailInvalido = !usuario.validarEmail();
        validacao.senhaInvalida = !usuario.validarSenha();       

        let mensagem = '';
        if (validacao.emailInvalido && validacao.senhaInvalida) {
            mensagem = 'O campo e-mail e senha são inválidos!'
        } else if (validacao.emailInvalido) {
            mensagem = 'O campo e-mail é inválido!'
        } else if (validacao.senhaInvalida) {
            mensagem = 'O campo senha é inválido!'
        }
           
        this.setState({
            validacao: validacao
        });
        if(mensagem){
            this.props.erro(mensagem)
        }else{
            this.props.onSubmit(this.state.usuario)
        }
    }

    render(){
        return (
            <section className="login">
                <div className="container">
                    <div className="row align-items-center login__box">
                        <div className="col-md-4">                            
                            <form className="login__form form">
                                <h1 className="login__title">Entrar</h1>
                                <Label 
                                    classList={'sr-only'}
                                    htmlFor="email" 
                                    texto="E-mail" 
                                    valorInvalido={false}
                                />
                                <Input 
                                    id="email"
                                    placeholder="Usuário"
                                    maxLength="40"
                                    className="form-control login__input"
                                    valorInvalido={this.state.validacao.emailInvalido}
                                    onChange={this.atualizarEmail.bind(this)}
                                />
                                <Label
                                    classList='sr-only'
                                    htmlFor="senha"
                                    texto="Senha"
                                    valorInvalido={false}
                                />
                                <Input 
                                    id="senha"
                                    placeholder="Senha"
                                    maxLength="40"
                                    className="form-control login__input"
                                    valorInvalido={this.state.validacao.senhaInvalida}
                                    onChange={this.atualizarSenha.bind(this)}
                                    type="password"
                                />
                                <Button
                                    classList="btn btn-lg btn-primary btn-block"
                                    texto="Entrar"
                                    onClick={
                                        // e => {
                                        //     e.preventDefault
                                            this.validar.bind(this)
                                        //         this.props.onSubmit(this.state.usuario)
                                        // }         
                                    }
                                />
                                <Link to="/cadastro" className="login__cadastrar">Ainda não tenho cadastro</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default FormLogin