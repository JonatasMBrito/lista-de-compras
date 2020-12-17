import React from 'react'

export default function InputSelect(props){
    const estilo = {
        borderColor: props.valorInvalido ? '#d50000' : '#cccccc',
        backgroundColor: props.valorInvalido	? '#ffcdd2' : '#ffffff',
    }
   
    const selecionado = props.selecionado
    const opcoes = props.opcoes
    let option = '';
    opcoes.forEach(item => {
        if(item === selecionado)
            option += `<option selected value="${item}">${item}</option>`

        option += `<option value="${item}">${item}</option>`
    });
   
    let	propriedades = Object.assign({},props);
    delete	propriedades.valorInvalido;

    return(
        <select {...propriedades}>
            <option value="">Selecione</option>
            {option}
        </select>
    );
}