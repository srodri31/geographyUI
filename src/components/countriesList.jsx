import React, { Component } from 'react';
import CountryCard from './countryCard';

class CountriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        }
    }

    componentDidMount(){
        fetch("http://localhost:3000/countries")
            .then(result => result.json())
            .then(countries => this.setState({countries}))
            .catch(err => alert(err));
    }

    handleUpdateCountry = (code, body) => {
        fetch(`http://localhost:3000/countries/${code}`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(() => fetch("http://localhost:3000/countries"))
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
                .then(countries => this.setState({countries}))
                .catch(err => alert(err));
        }
    }

    handleFilter = (e) => {
        const { value } = e.target;
        fetch(`http://localhost:3000/countries/?name=${value}`)
            .then(result => result.json())
            .then(countries => this.setState({countries}))
            .catch(err => alert(err));
    }

    render(){
        const { countries } = this.state;
        return (
            <div>
                <h1>Countries</h1>
                <input type="text" onChange={this.handleFilter}></input>
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
        )
    }
}

export default CountriesList;