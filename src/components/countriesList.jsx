import React, { Component } from 'react';

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

    render(){
        const { countries } = this.state;
        return (
            <ul>
                {countries.map(({code, name}) => <li key={code}>{name}</li>)}
            </ul>
        )
    }
}

export default CountriesList;