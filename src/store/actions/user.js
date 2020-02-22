import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        user
    }
}

export const fetchUserFailed = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error
    }
}

export const fetchUser = (id) => {
    return dispatch => {
        dispatch(fetchUserStart())

        let url = "http://localhost:3030/user/" +id
        axios.get(url)
        .then(res => {
            console.log(res)

            dispatch(fetchUserSuccess(res.data))
        }).catch(e => {
            console.log("Error: ", e)
            dispatch(fetchUserFailed(e))
        })
    }
}

export const toggleUserModal = () => {
    return {
        type: actionTypes.TOGGLE_USER_MODAL
    }
}