import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonItem(props){
    const destino = props.destino
    return(
        <Link to={destino} className="lp__add">Adicionar item</Link>
    )
}