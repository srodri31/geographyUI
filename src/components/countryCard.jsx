import React , { Component } from 'react';

class CountryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: this.props.country.name
        }
    }

    handleChange = (e) => {
        const name = e.target.value;
        this.setState({name});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const {code} = this.props.country;
        const body = {
            name: this.state.name
        }
        this.props.onUpdate(code, body);
        this.setState({
            isEditing: false
        });
    }

    handleEditClick= (e) => {
        const isEditing = !this.state.isEditing;
        this.setState({isEditing, name: this.props.country.name})
    }

    handleDeleteClick= () => {
        this.props.onDelete(this.props.country.code);
    }

    displayEdit() {
        const {code, name} = this.props.country;
        if(this.state.isEditing) {
            return(
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.name} onChange={this.handleChange}></input>
                    <input type="submit" value="Guardar"></input>
                    <button onClick={this.handleEditClick}>Cancelar</button>
                </form>
            )
        } else {
            return(
                <React.Fragment>
                    {name} - {code} 
                    <button onClick={this.handleEditClick}>Editar</button>
                    <button onClick={this.handleDeleteClick}>Eliminar</button>
                </React.Fragment>
            );
        }
    }

    render(){
        return(
            <div>
                {this.displayEdit()}
            </div>
        )
    }
}

export default CountryCard;