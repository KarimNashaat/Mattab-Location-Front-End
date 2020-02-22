import * as actionTypes from '../actions/actionTypes'
import { authSuccess } from '../utility'

const initialState = {
    loading: false,
    token: null,
    signInForm: true,
    error: null,
    redirectPath: null,
    savedRoutes: null,
    myRoutes: null,
    user: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_FORM_TOGGLE:
            return { ...state, signInForm: !state.signInForm }
        case actionTypes.AUTH_START:
            return { ...state, loading: true }
        case actionTypes.AUTH_FAIL:
            return { ...state, loading: false, error: action.error }
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_LOGOUT:
            return initialState
        case actionTypes.AUTH_REDIRECT:
            return { ...state, redirectPath: action.path }
        case actionTypes.UPDATE_MY_ROUTES:
            return { ...state, myRoutes: action.myRoutes }
        case actionTypes.UPDATE_SAVED_ROUTES:
            return { ...state, savedRoutes: action.savedRoutes }
        default:
            return state
    }
}

export default reducer