import React from 'react'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import InputSelect from '../InputSelect'

import Lista from '../../models/Lista.js'


class FiltrosLista extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            lista: new Lista(),
            validacao: {
                nomeInvalido: false,
                emailInvalido: false
            }
        }
    }
    
    atualizaNome(e){
        let lista = this.state.lista
        lista.nome = e.target.value
        this.setState({
            lista: lista
        })
    }
    atualizaConvidados(e){
        let lista = this.state.lista
        lista.convidado.email = e.target.value
        this.setState({
            lista: lista
        })
    }

    validarNome(e){
        let lista = this.state.lista;
        let validacao = this.state.validacao;
        validacao.nomeInvalido = !lista.validarNome();  

        let mensagem = '';
        if (validacao.nomeInvalido) {
            mensagem = 'O campo nome é inválido!'
        }

        if(mensagem)
            this.props.erro(mensagem)
            
        this.setState({
            validacao: validacao
        });
        
        if(mensagem === '')
            this.props.listaTrocaNome(this.state.lista)
    }
    
    validarEmail(e){

    }

    render(){
        return(
            <div className="lp__infos">
                <div className="container">
                    <div className="form-row justify-content-between">
                        <div className="col-12">
                            <div class="form-group">
                                <Label 
                                    htmlFor="nome" 
                                    texto="Lista" 
                                    valorInvalido={this.state.validacao.nome}
                                />
                                <Input 
                                    id="nome"
                                    placeholder="Nome da lista"
                                    maxLength="20"
                                    className="form-control"
                                    defaultValue={this.props.nome}
                                    valorInvalido={this.state.validacao.nome}
                                    onChange={this.atualizaNome.bind(this)}
                                    type="text"
                                />   
                            </div> 
                        </div>
                        <div className="col-12">
                            <div class="form-group">
                                <Button 
                                    classList="btn btn-primary"
                                    texto="Trocar o nome"
                                    onClick={
                                        this.validarNome.bind(this)       
                                    }
                                /> 
                            </div>
                        </div>
                        <div className="col-12">
                            <div class="form-group">
                                <Label 
                                    htmlFor="convidados" 
                                    texto="Convidados" 
                                    valorInvalido={this.state.validacao.email}
                                />
                                <Input 
                                    id="convidados"
                                    placeholder="e-mail dos convidados"
                                    className="form-control"
                                    defaultValue={this.props.convidados}
                                    valorInvalido={this.state.validacao.email}
                                    onChange={this.atualizaConvidados.bind(this)}
                                    type="text"
                                /> 
                            </div>   
                        </div>
                        <div className="col-12">
                            <Button 
                                classList="btn btn-primary"
                                texto="Cadastrar email"
                                onClick={
                                    this.validarEmail.bind(this)       
                                }
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FiltrosLista
