import React, { component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class Formulario extends component {
    constructor(props){
        super(props)
        this.state = {
            nombre: '',
            email: '',
        }
    }

    syncNombreChanges(nombre){
        this.setState({
            nombre: nombre
        })
    }

    syncEmailChanges(email){
        this.setState({
            email: email
        })
    }

    SubmitForm(){

    }

    render(){
        return(
            <form>
                <input 
                onChange={(ev)=>{ this.syncNombreChanges(ev.target.value)}}
                type="text" 
                value={this.state.nombre} 
                placeholder='Nombre y Apellido' />
                <input 
                onChange={(ev)=>{ this.syncEmailChanges(ev.target.value)}}
                type="email" 
                value={this.state.email} 
                placeholder='Correo Electronico' />
                <div>
                    <input 
                    onClick={ ()=> this.SubmitForm()}
                    type="submit" 
                    value="Guardar Cambios" />
                </div>
            </form>
        )
    }
}

class app extends component {
    constructor() {
        super();
        this.state = {
            name: 'React'
        };
    }

    render() {
        let nombre = "Uriel";
        return (
            <div>
                <Formulario/>
            </div>
        )
    }

}