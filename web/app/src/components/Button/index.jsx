import React from 'react'

export default function Button(props){
    return (
        <button
            className={props.classList}
            onClick={props.onClick}
        >
            {props.texto}
        </button>
    )

}