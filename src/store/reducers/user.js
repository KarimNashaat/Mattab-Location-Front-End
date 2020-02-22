import * as actionTypes from '../actions/actionTypes'
import { authSuccess } from '../utility'

const initialState = {
    loading: false,
    error: null,
    user: null,
    showUserModal: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_START:
            return { ...state, loading: true, showUserModal: true }
        case actionTypes.FETCH_USER_SUCCESS:
            return { ...state, loading: false, user: action.user }
        case actionTypes.FETCH_USER_FAIL:
            return { ...state, loading: false, error: action.error, showUserModal: false }
        case actionTypes.TOGGLE_USER_MODAL:
            return { ...state, showUserModal: false }
        default:
            return state
    }
}

export default reducer