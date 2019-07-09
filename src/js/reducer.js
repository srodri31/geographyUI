import * as types from "./actionTypes";

const rootReducer = (state = [], action) => {
    switch(action.type) {
        case types.FECTH_COUNTRIES_SUCCESS:
            return action.countries;
        default:
            return state;
    }
}

export default rootReducer;

