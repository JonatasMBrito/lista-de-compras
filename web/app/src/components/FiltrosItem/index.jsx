import React from 'react'
import Label from '../Label'
import Input from '../Input'
import Button from '../Button'
import InputSelect from '../InputSelect'

import Produto from '../../models/Produto.js'

class FiltrosItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            produto: new Produto(),
            validacao: {
                marcaInvalido: false,
                qtdeInvalido: false,
                tamanhoInvalido: false,
                precoInvalido: false
            }
        }
        
        let novoProduto = this.state.produto
        novoProduto.marca = this.props.marca
        novoProduto.qtde = this.props.qtde
        novoProduto.tamanho = this.props.tamanho
        novoProduto.preco = this.props.preco
       
        this.setState({
            produto: novoProduto
        })
    }

    atualizaMarca(e){
        console.log(this.props, this.state.produto)
        let produto = this.state.produto
        produto.marca = e.target.value
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
        e.preventDefault()
        let produto = this.state.produto;
        let validacao = this.state.validacao;

        validacao.marcaInvalido = !produto.validarMarca()
        validacao.qtdeInvalido = !produto.validarQtde()
        validacao.tamanhoInvalido = !produto.validarTamanho()
        validacao.precoInvalido = !produto.validarPreco() 
        
        let mensagem = '';
        if (validacao.marcaInvalido) {
            mensagem = 'O campo marca é inválido!'
        }else if (validacao.qtdeInvalido) {
            mensagem = 'O campo quantidade é inválido!'
        }else if (validacao.tamanhoInvalido) {
            mensagem = 'O campo tamanho é inválido!'
        }else if (validacao.precoInvalido) {
            mensagem = 'O campo valor é inválido!'
        }

        if(mensagem)
            this.props.erro(mensagem)
            
        this.setState({
            validacao: validacao
        });
        
        if(mensagem === '')
            this.props.atualizarProduto(this.state.produto)
    }

    render(){

        return(
            <div className="lp__infos">
                <div className="container">
                    <div className="form-row justify-content-between">
                        <div className="col-8">
                            <Label 
                                classList={'sr-only'}
                                htmlFor="brand" 
                                texto="Marca" 
                                valorInvalido={this.state.validacao.marcaInvalido}
                            />
                            <Input 
                                id="brand"
                                placeholder="Nome da marca"
                                maxLength="40"
                                className="form-control"
                                defaultValue={this.props.marca}
                                valorInvalido={this.state.validacao.marcaInvalido}
                                onChange={this.atualizaMarca.bind(this)}
                                type="text"
                            />    
                        </div>
                        <div className="col-3 d-flex">
                            <Label 
                                classList={'sr-only'}
                                htmlFor="qty" 
                                texto="Quantidade" 
                                valorInvalido={this.state.validacao.qtdeInvalido}
                            />
                            <Input 
                                id="qty"
                                placeholder="0"
                                maxLength="2"
                                className="form-control -number"
                                defaultValue={this.props.qtde}
                                valorInvalido={this.state.validacao.qtdeInvalido}
                                onChange={this.atualizaQtde.bind(this)}
                                type="number"
                            />                            
                        </div>
                    </div>
                    <div className="form-row justify-content-between">
                        <div className="col-10">
                            <Label 
                                classList={'sr-only'}
                                htmlFor="size" 
                                texto="Tamanho da embalagem" 
                                valorInvalido={this.state.validacao.tamanhoInvalido}
                            />
                            <Input 
                                id="size"
                                placeholder="Ex: Caixa, pacote"
                                maxLength="40"
                                className="form-control"
                                defaultValue={this.props.tamanho}
                                valorInvalido={this.state.validacao.tamanhoInvalido}
                                onChange={this.atualizaTamanho.bind(this)}
                                type="text"
                            />    
                            {/* <InputSelect 
                                id="size"
                                className="form-control -number"
                                valorInvalido={false}
                                selecionado={this.props.tamanho}
                                opcoes={['1 KG', '2 Litro', '600ml']}
                                // onChange={this.atualizaPreco.bind(this)}
                            /> */}
                            
                        </div>
                    </div>
                    <div className="form-row justify-content-between">
                        {/* <div className="col-6 d-flex align-items-center">
                            <label>Menor preço <strong>R$10,00</strong><br />Maior preço <strong>R$13,95</strong></label>
                        </div> */}
                        <div className="col-6 d-flex align-items-center flex-wrap">
                            <Label 
                                classList={'sr-only'}
                                htmlFor="value" 
                                texto="Valor pago" 
                                valorInvalido={false}
                            />
                            <Input 
                                id="value"
                                placeholder="R$ 0,00"
                                maxLength="6"
                                className="form-control"
                                defaultValue={this.props.preco}
                                valorInvalido={this.state.validacao.precoInvalido}
                                onChange={this.atualizaPreco.bind(this)}
                                type="number"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button 
                            classList="btn btn-primary"
                            texto="Atualizar produto"
                            onClick={
                                this.validar.bind(this)       
                            }
                        /> 
                    </div>
                </div>
            </div>
        )
    }
}

export default FiltrosItem
