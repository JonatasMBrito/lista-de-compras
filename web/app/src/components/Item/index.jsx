import React from 'react'
import FiltroItem from '../FiltrosItem'
import FiltroLista from '../FiltrosLista'

class ListaItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ativo: true
        }
    }

    
    renderizaButtonArrow(){
        return(
            <button className="lp__itemArrow" onClick={
                e => {
                    e.preventDefault()
                    e.stopPropagation()
                    let btn = e.target
                    if(btn.classList.contains('-active')){
                        btn.classList.remove('-active')
                        btn.closest('.lp__body').querySelector('.lp__infos').classList.remove('-active')
                    }else{
                        btn.classList.add('-active')
                    }
                }
               
            }></button>
        )
    }
    renderizaButtonEditar(){
        return(
            <button className="lp__itemArrow" onClick={
                e => {
                    e.preventDefault();
                    e.stopPropagation();
                    let btn = e.target
                    if(btn.classList.contains('-active')){
                        btn.classList.remove('-active');
                        btn.closest('.lp__body').querySelector('.lp__infos').classList.remove('-active')
                    }else{
                        btn.classList.add('-active')
                    }
                }               
            }></button>
        )
    }
    renderizaButtonRemover(){
        return(
            <button className="lp__itemRemove" onClick={
                e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.listaRemove()
                }               
            }></button>
        )
    }
    renderizaQtde(qtde, tamanho){
        let item = `<span className="lp__itemQty"><strong>${qtde}</strong>${tamanho}</span>`
        return(
            <span className="lp__itemQty"><strong>{qtde}</strong>{tamanho}</span>
        )
    }

    renderizaConvidados(convidados){  
        let texto = ''
        if(convidados){
            const rowLen = convidados.length;
            texto = convidados.map((item, i) => {
                if (rowLen === i + 1)
                    return item.name
                return item.name+', '
            });
        }
        return(
            <p className="lp__itemBrand">
                {texto}
            </p>
        )
    }
    statusItem(){
        let status = this.props.status
        if(status != false || status){           
            status = '-inativo'
        }else{            
            status = ''
        }           

        return `media-body lp__media ${status}`
    }

    renderizarItem(){
        const tipo = this.props.tipo
        if(tipo === 'lista'){
            return(
                <div className="media-body lp__media">
                    <div className="lp__itemBox">
                        <div className="lp__itemText">
                            <h2 className="lp__itemName">{this.props.nome}</h2>
                            {this.renderizaConvidados(this.props.convidados)}
                        </div>
                        <div className="lp__itemBtns">
                            {this.renderizaButtonEditar()}
                            {this.renderizaButtonRemover()}
                        </div>
                    </div>
                </div>
            )
        }else{
            return( 
                <div className={this.statusItem()}>
                    <div className="lp__itemBox">
                        <h2 className="lp__itemName">{this.props.nome}</h2>
                        <p className="lp__itemBrand"><strong>{(this.props.marca ? `marca: ${this.props.marca}` : '')}</strong></p>
                    </div>
                    {this.renderizaQtde(this.props.qtde, this.props.tamanho)}
                    {this.renderizaButtonArrow()}
                    {this.renderizaButtonRemover()}
                    
                </div>
            )
        }
    }

    renderizarFiltro(){
        const tipo = this.props.tipo
        if(tipo === 'lista'){
            return(
                <FiltroLista
                    nome={this.props.nome}
                    convidados={this.props.convidados}
                    listaTrocaNome={this.props.listaTrocaNome}
                    listaAdicionaConvidado={this.props.listaAdicionaConvidado}           
                    erro={this.props.erro}
                />
            )
        }else{
            return(
                <FiltroItem
                    marca={this.props.marca}
                    qtde={this.props.qtde}
                    tamanho={this.props.tamanho}
                    preco={this.props.preco}
                    atualizarProduto={this.props.atualizarProduto}
                    erro={this.props.erro}
                />
            )
        }
    }

    render(){
        return(   
            <div className="row lp__body">  
                <div className="media col-md-12 lp__item" onClick={this.props.onClick}>              
                    {this.renderizarItem()}                    
                </div>
                {this.renderizarFiltro()}
            </div>  
        )
    }
}

export default ListaItem
