import * as types from './actionTypes';

export function fecthCountries() {
    return function(dispatch) {
        return fetch(`http://localhost:3000/countries/`)
            .then(result => result.json())
            .then(countries => dispatch(fecthCountriesSuccess(countries)))
            .catch(err => {throw(err)});
    }
}

export function fecthCountriesSuccess(countries) {
    return { type: types.FECTH_COUNTRIES_SUCCESS, countries }
}