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
                <article className="card p-5">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="input-text"></input>
                        <footer className="p-5">
                            <input type="submit" value="Guardar" className="button m-2"></input>
                            <button onClick={this.handleEditClick} className="button btn-error m-2">Cancelar</button>
                        </footer>
                    </form>
                </article>
            )
        } else {
            return(
                <article className="card p-5">
                    <h1 onClick={this.handleEditClick}>
                        {name} - {code}
                    </h1>
                    <footer className="p-5">
                        <button onClick={this.handleEditClick} className="button m-2">Editar</button>
                        <button onClick={this.handleDeleteClick} className="button btn-error m-2">Eliminar</button>
                    </footer>
                </article>
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