import React from 'react'
import ReactDOM from 'react-dom';
import Toast from './Toast'
import FormLogin from './FormLogin'
import FormCadastro from './FormCadastro'
import HeaderLista from './HeaderLista'
import AdicionarLista from './AdicionarLista'
import AdicionarProduto from './AdicionarProduto'
import Item from './Item'
import history from './history.js'
// import Login from 'Login.js'
import { BrowserRouter, Switch, Router, Route, withRouter, Link } from 'react-router-dom'

import Usuario from '../models/Usuario.js'
import Lista from '../models/Lista.js'
import Produto from '../models/Produto.js'
import { stat } from 'fs';

class App extends React.Component {
    constructor(props){
        super(props)
        Usuario.obter(usuario => {
            this.state = {
                usuario: usuario,
                lista: [],
                produto: new Produto()
            }
        }, () => {
            this.state = {
                usuario: new Usuario(),
                lista: [],
                produto: new Produto()
            }
        }) 

        Lista.obter((data) => {
            data.forEach((item) => {
                this.setState(state => {
                    const lista = state.lista.push(
                        {
                            id: item._id,
                            nome: item.nome,
                            proprietario: {
                                id: item.usuario._id,
                                nome: item.usuario.name
                            },
                            convidados: item.convidados,
                            produtos: (item.itens ? item.itens : [])
                        }
                    )
                    return lista
                })
               
            })
            
        }, (err) => {
            console.log('Erro ao fazer solicitação', err);
        },
            this.state.usuario
        )
        

        
    }
    renderizaItemLista(item){
        return(
            <Item  
                tipo='lista' 
                nome={item.nome}
                convidados={item.convidados}
                onClick={
                    e => { 
                        e.preventDefault()
                        history.push(`/lista/${item.nome}/${item.id['$id']}`);
                    }
                } 
                removerLista={
                    novaLista => {
                        let listaAtualizada = novaLista
                        Lista.remover(
                            () => {
                                let lista = this.selecionaLista(item.id['$id'])
                                console.log(lista);
                                lista.nome = listaAtualizada.nome;
                                let novalista = this.atualizaLista(lista.id['$id'], lista)
                                this.setState(state =>{
                                    const lista = novalista
                                    return lista
                                })
                            },
                            listaAtualizada.nome,
                            item.id['$id']
                        )
                    }
                }  
                listaAdicionaConvidado ={
                    e => {
                        console.log(e);
                    }
                }
                listaTrocaNome={
                    novaLista => {
                        let listaAtualizada = novaLista
                        Lista.trocaNome(
                            () => {
                                let lista = this.selecionaLista(item.id['$id'])
                                console.log(lista);
                                lista.nome = listaAtualizada.nome;
                                let novalista = this.atualizaLista(lista.id['$id'], lista)
                                this.setState(state =>{
                                    const lista = novalista
                                    return lista
                                })
                            },
                            listaAtualizada.nome,
                            item.id['$id']
                        )
                    }
                    
                } 
                listaRemove={    
                    () => {                
                        Lista.deletar(
                            () => {
                                let novasListas = this.removeLista(item.id['$id'])
                                console.log(novasListas)
                                console.log(this.state.lista)
                                this.setState({
                                    lista: novasListas
                                })
                            },
                            item.id['$id']
                        )
                    }
                }
                erro={msg=>this.refs.toast.erro(msg)}
            />      
        )
    }

    renderizaLista(){ 
        console.log(this.state.lista)    
        const itens = this.state.lista
            .slice(0, this.state.lista.length)
            .map(
                item => this.renderizaItemLista(item)      
            )
            return(
                <div>
                    {itens}                
                </div>
           
           )
    }

    selecionaLista(idLista){
        let item = ''
        this.state.lista.forEach(value =>{
            if(value.id['$id'] == idLista){                
                item = value 
            }
        })
        return item;
    }

    atualizaLista(idLista, itemAtualizado){
        let novaLista = []
        let lista = this.state.lista
        lista.forEach(value =>{
            if(value.id['$id'] == idLista){                
                value = itemAtualizado
            }
            novaLista.push(value)
        })
        return novaLista;
    }

    componentDidMount(){
        console.log('mudou')
    }

    removeLista(idLista){
        let novaLista = []
        let lista = this.state.lista
        lista.forEach(value =>{
            if(value.id['$id'] !== idLista)
                novaLista.push(value)
        })
        return novaLista;      
    }

    selecionaProduto(listaId, nomeProduto){
        let lista = this.selecionaLista(listaId)
        let item = ''
        lista.produtos.forEach(value =>{
            if(value.nome === nomeProduto){                
                item = value 
            }
        })
        return item;
    }

    atualizaProduto(listaId, nomeProduto, produto){
        let novaLista = []
        let lista = this.selecionaLista(listaId)
        lista.produtos.map(value =>{
            if(value.nome === nomeProduto)              
                value = produto

            novaLista.push(value)
        })
        return novaLista;        
    }

    removeProduto(listaId, nomeProduto){
        let novaLista = []
        let lista = this.selecionaLista(listaId)
        lista.produtos.map(value =>{
            if(value.nome !== nomeProduto)
                novaLista.push(value)
        })
        return novaLista;        
    }

    renderizaProduto(idLista){
        const item = this.selecionaLista(idLista)
        return(
            <div>
                {this.renderizaListaProdutos(item)}
            </div>
        
        )
    }

    renderizaListaProdutos(lista){
        if(!lista.produtos)
            return false;
 
        let listaProdutos = []
        lista.produtos.forEach( item => {
            listaProdutos.push(  
                <Item  
                    tipo='produto' 
                    nome={item.nome}
                    marca={item.marca}
                    tamanho={item.tamanho}
                    preco={item.preco}
                    qtde={item.qtde}
                    status={item.comprado}
                    onClick={
                        (e) => { 
                            e.preventDefault()
                            const status = (item.comprado ? false : true); 
                            Produto.statusCompra(
                                () => {
                                    let produto = this.selecionaProduto(lista.id['$id'], item.nome)
                                    produto.comprado = status;
                                    let novalista = this.atualizaProduto(lista.id['$id'], item.nome, produto)
                                    this.setState(state =>{
                                        const lista = novalista
                                        return lista
                                    })
                                },
                                lista.id['$id'],
                                item.nome,
                                this.state.usuario,
                                status
                            )
                        }
                    }  
                    atualizarProduto={
                        (produto) => { 
                            console.log(produto)   
                            console.log('Atualizar Produto')
                            const novoProduto = produto
                            Produto.atualizaProduto(
                                () => {
                                    let produto = this.selecionaProduto(lista.id['$id'], item.nome)
                                    produto.marca = novoProduto.marca
                                    produto.tamanho = novoProduto.tamanho
                                    produto.qtde = novoProduto.qtde
                                    produto.preco = novoProduto.preco
                                    let novalista = this.atualizaProduto(lista.id['$id'], item.nome, produto)
                                    this.setState(state =>{
                                        const lista = novalista
                                        return lista
                                    })
                                },
                                lista.id['$id'],
                                item.nome,
                                produto
                            )
                        }
                    }
                    listaRemove={    
                        () => { 
                            Produto.removerProduto(
                                () => {
                                    let novaLista = this.selecionaLista(lista.id['$id'])
                                    let novosProdutos = this.removeProduto(lista.id['$id'], item.nome)
                                    novaLista.produtos = novosProdutos;
                                    console.log(novaLista)
                                    this.setState(state =>{
                                        const lista = novaLista
                                        return lista
                                    })
                                },
                                lista.id['$id'],
                                item.nome
                            )
                        }
                    }
                    erro={msg=>this.refs.toast.erro(msg)}  
                />
            )    
        })
        return(
            <div>
                {listaProdutos}
            </div>
        )
    }

    renderizarLogin() {
        return(
            <Switch>
                <Route path="/cadastro" exact={true} render={() => (
                    <FormCadastro
                        onSubmit={usuario => {
                            usuario.salvar(
                                () => {
                                    this.setState({
                                        usuario: usuario
                                }, () => {
                                    /**
                                     * Adicionar mensagem e settimeout
                                     */
                                    console.log('Cadastro efetuado com sucesso!');
                                    history.push('/');
                                })
                            })
                        }}                    
                        erro={msg=>this.refs.toast.erro(msg)}
                    />
                )} />
                <Route path="/" exact={true} render={() => (
                    <FormLogin 
                        onSubmit={usuario => {
                            usuario.login(
                                (novousuario) => {
                                    console.log(novousuario)
                                    

                                    Lista.obter((data) => {
                                        console.log(data)
                                        data.forEach((item) => {
                                            this.setState(state => {
                                                const lista = state.lista.push(
                                                    {
                                                        id: item._id,
                                                        nome: item.nome,
                                                        proprietario: {
                                                            id: item.usuario._id,
                                                            nome: item.usuario.name
                                                        },
                                                        convidados: item.convidados,
                                                        produtos: (item.itens ? item.itens : [])
                                                    }
                                                )
                                                return lista
                                            })
                                           
                                        })

                                        this.setState({
                                            usuario: novousuario
                                        })
                                        
                                    }, (err) => {
                                        this.refs.toast.erro('Erro ao fazer solicitação')
                                        console.log('Erro ao fazer solicitação', err);
                                    },
                                        novousuario
                                    )
                                    console.log('Login efetuado com sucesso!');
                                    history.push('/')
                                },(msg) => {
                                    console.log(msg)
                                    this.refs.toast.erro(msg)
                                }
                            )
                        }}                    
                        erro={msg=>this.refs.toast.erro(msg)}
                    />
                )} />                    
            </Switch>
            
        )
    }


    renderizar(){
        let usuario = this.state.usuario;

        if (this.state.usuario && this.state.usuario.id){
            
            return (
                <Switch>
                    <Route path="/" exact={true} render={() => (
                        <div className="container">
                            <HeaderLista 
                                titulo={'Listas'}
                                tipoLista={''}
                                btnVoltarClass={'d-none'}
                            />
                            <AdicionarLista 
                                validar={true}
                                onSubmit={
                                    (item) => {
                                        console.log(item)
                                        this.setState(state => {
                                            const list = state.lista.push(
                                                {
                                                    id: item.id,
                                                    nome: item.nome,
                                                    proprietario: {
                                                        id: item.proprietario._id,
                                                        nome: item.proprietario.name
                                                    },
                                                    convidados: item.convidados,
                                                    produtos: item.itens  
                                                }
                                            )
                                            return list
                                        })
                                    }
                                }                 
                                erro={msg=>this.refs.toast.erro(msg)}
                            />
                            
                            { this.renderizaLista() }
                            
                        </div>
                    )} />  

                    <Route path="/lista/:nome/:id" component={({match}) => (                         
                        <div className="container">
                            <HeaderLista                             
                                titulo={match.params.nome}
                                tipoLista={''}
                                btnVoltarClass={'lp__headerVoltar'}
                            />
                            <AdicionarProduto
                                validar={true}
                                listaId={match.params.id}
                                onSubmit={
                                    (item) => {
                                        let lista = this.selecionaLista(match.params.id)
                                        console.log(item)
                                        console.log(lista)
                                        if(!lista.produtos)
                                            lista.produtos = []
                                            
                                        lista.produtos.push(
                                            {
                                                nome: item.nome,
                                                qtde: item.qtde,
                                                marca: item.marca,
                                                tamanho: item.tamanho,
                                                preco: item.preco,
                                                infos: item.infos,
                                                comprado: false
                                            }
                                        )
                                        console.log(lista)
                                        this.setState(state =>{
                                            // lista: this.atualizaLista(match.params.id, lista)
                                            const lista = this.atualizaLista(match.params.id, lista)
                                            return lista
                                        })
                                    }
                                }                 
                                erro={msg=>this.refs.toast.erro(msg)}
                            />
                            { this.renderizaProduto(match.params.id) }
                        </div>
                    )} />  
                </Switch>
            )
        }else{
            return this.renderizarLogin()
        }
    }

    render() {
        return (
            <section className="lp">
                <BrowserRouter>
                    <Router history={history}>
                        {}
                        {this.renderizar()}
                        <Toast ref="toast" />
                    </Router>
                </ BrowserRouter>
            </section>
        );
    }
}

export default App