import React from 'react'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import Toast from '../Toast/index.jsx'


// import Lista from '../../models/Lista.js'
import Produto from '../../models/Produto'

class AdicionarProduto extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            produto: new Produto(),
            validacao: {
                nomeInvalido: false,
                qtdeInvalido: false,
                marcaInvalido: false,
                tamanhoInvalido: false,
                precoInvalido: false,
            }
        }
    }

    atualizaNome(e){
        let produto = this.state.produto
        produto.nome = e.target.value
        this.setState({
            produto: produto
        })
    }

    atualizaQtde(e){
        let produto = this.state.produto
        produto.qtde = e.target.value
        this.setState({
            produto: produto
        })
    }

    atualizaMarca(e){
        let produto = this.state.produto
        produto.marca = e.target.value
        this.setState({
            produto: produto
        })
    }

    atualizaTamanho(e){
        let produto = this.state.produto
        produto.tamanho = e.target.value
        this.setState({
            produto: produto
        })
    }

    atualizaPreco(e){
        let produto = this.state.produto
        produto.preco = e.target.value
        this.setState({
            produto: produto
        })
    }

    validar(e){
        let result = '';
        e.preventDefault();
        let produto = this.state.produto
        let validacao = this.state.validacao
        validacao.nomeInvalido = !produto.validarNome()
        let mensagem = '';
        if (validacao.nomeInvalido) {
            mensagem = 'O nome do produto é inválido!'
        }
        if(mensagem)
            this.props.erro(mensagem)
            
        this.setState({
            validacao: validacao
        });
        
        if(mensagem === ''){
            this.state.produto.criar(this.props.onSubmit, this.props.listaId)
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12 lp__register">
                    <div className="lp__registerBox">
                        <div className="form-group">
                            <Label
                                htmlFor="nome"
                                texto="Nome do produto"
                                valorInvalido={this.state.validacao.nomeInvalido}
                            />
                            <Input 
                                id="nome"
                                placeholder="Ex: Refrigerante"
                                maxLength="20"
                                className="form-control"
                                valorInvalido={this.state.validacao.nomeInvalido}
                                onChange={this.atualizaNome.bind(this)}
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor="qtde"
                                texto="Quantidade"
                                valorInvalido={this.state.validacao.qtdeInvalido}
                            />
                            <Input 
                                id="qtde"
                                placeholder="1"
                                maxLength="20"
                                className="form-control"
                                valorInvalido={this.state.validacao.qtdeInvalido}
                                onChange={this.atualizaQtde.bind(this)}
                                type="number"
                            />
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor="tamanho"
                                texto="Tamanho"
                                valorInvalido={this.state.validacao.tamanhoInvalido}
                            />
                            <Input 
                                id="tamanho"
                                placeholder="2 litros, 500ml, caixa..."
                                maxLength="20"
                                className="form-control"
                                valorInvalido={this.state.validacao.tamanhoInvalido}
                                onChange={this.atualizaTamanho.bind(this)}
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor="marca"
                                texto="Nome da marca"
                                valorInvalido={this.state.validacao.marcaInvalido}
                            />
                            <Input 
                                id="marca"
                                placeholder="Ex Coca-Cola, Omo..."
                                maxLength="20"
                                className="form-control"
                                valorInvalido={this.state.validacao.marcaInvalido}
                                onChange={this.atualizaMarca.bind(this)}
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <Label
                                htmlFor="preco"
                                texto="Preço"
                                valorInvalido={this.state.validacao.precoInvalido}
                            />
                            <Input 
                                id="preco"
                                placeholder="R$ 00,00"
                                maxLength="20"
                                className="form-control"
                                valorInvalido={this.state.validacao.precoInvalido}
                                onChange={this.atualizaPreco.bind(this)}
                                type="text"
                            />
                        </div>
                        <Button
                            classList="btn btn-primary"
                            texto="Adicionar Produto"
                            onClick={
                                // console.log('Cadastro de produto')
                                this.validar.bind(this)      
                            }
                        />
                    </div>
                </div>      
            </div>
        );
    }
}

export default AdicionarProduto;