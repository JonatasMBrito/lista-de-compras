import React from 'react';
import Button from '../Button'
import {Link } from 'react-router-dom'

export default function HeaderLista(props) {
    const titulo = props.titulo
    const tipoLista = props.tipoLista;
    return (
        <div className="row">
            <div className="lp__header col-md-12"> 
                <Link to="/" className={props.btnVoltarClass}><span className="sr-only">Voltar</span></Link>               
                <div className="lp__user">
                    <span className="lp__iten -private">{tipoLista}</span>
                </div>                
                <Button
                    classList={'lp__add'}
                    onClick={
                        e => {
                            e.preventDefault()
                            const box = document.querySelector('.lp__register')
                            box.classList.toggle('-active');
                        }
                    }
                    texto={'Adicionar item'}
                />
                <h1 className="lp__name">{titulo}</h1>
            </div>
        </div>
    );
};
