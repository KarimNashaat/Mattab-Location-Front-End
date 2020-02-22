import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: null,
    routes: null,
    savedRoutes: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROUTES_START:
            return { ...state, loading: true}
        case actionTypes.FETCH_ROUTES_SUCCESS:
            return { ...state, loading: false, routes: action.routes }
        case actionTypes.FETCH_ROUTES_FAIL:
            return { ...state, loading: false, error: action.error }
        case actionTypes.RESET_ROUTES:
            return initialState
        // case actionTypes.GET_SAVED_ROUTES:
        //     return {...state, savedRoutes: action.savedRoutes}
        default:
            return state
    }
}

export default reducer