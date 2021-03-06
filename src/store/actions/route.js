import * as actionTypes from './actionTypes'
// import axios from 'axios'
import axios from '../../axios_auth'

export const fetchRouteStart = () => {
    return {
        type: actionTypes.FETCH_ROUTES_START
    }
}

export const fetchRouteSuccess = (routes) => {
    return {
        type: actionTypes.FETCH_ROUTES_SUCCESS,
        routes
    }
}

export const fetchRouteFailed = (error) => {
    return {
        type: actionTypes.FETCH_ROUTES_FAIL,
        error
    }
}

export const fetchRoutes = (body) => {
    return dispatch => {
        dispatch(fetchRouteStart())

        let url =  "/routes"
        axios.get(url, {params: {...body}})
        .then(res => {
            dispatch(fetchRouteSuccess(res.data.reverse()))
        }).catch(e => {
            console.log("Error: ", e)
            dispatch(fetchRouteFailed(e))
        })
    }
}

export const resetRoutes = () => {
    return {
        type: actionTypes.RESET_ROUTES
    }
}

// export const getSavedRoutes = () => {
//     axios.get("http://localhost:3030/routes")
//     .then(res => {
//         return {
//             type: actionTypes.GET_SAVED_ROUTES,
//             savedRoutes: res.data.savedRoutes
//         }
//     }).catch(e => {
//         console.log("Error: ", e)
//     })
// }

