import React, { Component } from 'react';
import CountryCard from './countryCard';
import { connect } from "react-redux";
import * as actions from "../js/actions";

class CountriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            filter: {
                name: ""
            }
        }
    }

    // componentDidMount(){
    //     const { name } = this.state.filter;
    //     fetch(`http://localhost:3000/countries/?name=${name}`)
    //         .then(result => result.json())
    //         .then(countries => this.setState({countries}))
    //         .catch(err => alert(err));
    // }

    handleUpdateCountry = (code, body) => {
        const { name } = this.state.filter;
        fetch(`http://localhost:3000/countries/${code}`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(() => fetch(`http://localhost:3000/countries/?name=${name}`))
            .then(result => result.json())
            .then(countries => this.setState({countries}))
            .catch(err => alert(err));
    }

    handleDeleteCountry = (code) => {
        let status = 0;
        let deleteIt = window.confirm("Are you sure?");
        if(deleteIt){
            fetch(`http://localhost:3000/countries/${code}`,
            {
                method: "DELETE"
            })
                .then(res => {
                    status = res.status;
                    if(!res.ok) return res.json();
                })
                .then(res => {
                    if(status !== 204) {
                        alert(res.message);
                    }
                    return fetch("http://localhost:3000/countries");
                })
                .then(result => result.json())
                .then(countries => this.setState({countries, filter: {name: ""}}))
                .catch(err => alert(err));
        }
    }

    handleFilter = (e) => {
        const { value } = e.target;
        this.setState({
            filter: { name: value }
        })
        const { name } = this.state.filter;
        fetch(`http://localhost:3000/countries/?name=${name}`)
            .then(result => result.json())
            .then(countries => this.setState({countries}))
            .catch(err => alert(err));
    }

    render(){
        // const { countries } = this.state;
        const { countries } = this.props;
        return (
            <div>
                <h1 className="text-center m-5">Countries</h1>
                <input 
                    type="text" 
                    value={this.state.filter.name} 
                    onChange={this.handleFilter} 
                    className="input-text m-5"
                    placeholder="Type a name..."/>
                <div className="card-container p-5">
                    {countries.map(country => {
                        return (
                            <CountryCard 
                                key={country.code} 
                                country={country} 
                                onUpdate={this.handleUpdateCountry}
                                onDelete={this.handleDeleteCountry}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        countries: state
    }
} 

export default connect(mapStateToProps)(CountriesList);