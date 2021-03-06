import * as actionTypes from './actionTypes'
import axios from '../../axios_auth'

export const authFormToggle = () => {
    return {
        type: actionTypes.AUTH_FORM_TOGGLE
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (res) => {
    let routes = null
    if (res.routes) {
        routes = res.routes.reverse()
    }
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: res.token,
        user: res.user,
        savedRoutes: res.user.savedRoutes,
        routes,
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logOut = () => {
    localStorage.removeItem('token')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRedirection = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path
    }
}

export const signUp = (email, password, name, job, phone, birthday, profilePicture, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart())

        const req = {
            email,
            password,
            name,
            job, 
            phone, 
            birthday, 
        }
        console.log(JSON.stringify(req))
        const formData = new FormData();
        formData.append('userData',JSON.stringify(req))
        formData.append('avatar',profilePicture)

        let url = "/user/signup"

        axios.post(url,formData)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)

                dispatch(authSuccess(res.data))
            }).catch(e => {
                console.log("Error: ", e)
                dispatch(authFailed(e))
            })
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(authStart())

        const req = {
            email,
            password,
        }
        console.log(process.env.REACT_APP_API_URL)
        const url =  "/user/login"
        axios.post(url,req)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)

                dispatch(authSuccess(res.data))
            }).catch(e => {
                console.log("Error: ", e)
                dispatch(authFailed(e))
            })
    }
}


export const onTrySignIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            return dispatch(logOut())
        }
        else {
            axios.get("/user/auto-login")
                .then(res => {
                    dispatch(authSuccess(res.data))
                })
                .catch(e => {
                    console.log(e.message)
                })
        }
    }
}

export const saveRoute = (route) => {
    console.log("Save")
    console.log(route)
    return dispatch => {
        axios.post("/user/savedroutes",  route)
                .then(res => {
                    console.log(res)
                    dispatch({
                        type: actionTypes.UPDATE_SAVED_ROUTES,
                        savedRoutes: res.data.savedRoutes.reverse()
                    })
                })
                .catch(e => {
                    console.log(e.message)
                })
    }
}

export const unsaveRoute = (route) => {
    console.log("UnSave")
    return dispatch => {
        axios.delete("/user/savedroutes/"+ route._id)
                .then(res => {
                    console.log(res)
                    dispatch({
                        type: actionTypes.UPDATE_SAVED_ROUTES,
                        savedRoutes: res.data.savedRoutes.reverse()
                    })
                })
                .catch(e => {
                    console.log(e.message)
                })
    }
}

export const deleteRoute = (route) => {
    return dispatch => {
        axios.delete(process.env.REACT_APP_API_URL +"/routes/"+ route._id)
                .then(res => {
                    console.log(res)
                    dispatch({
                        type: actionTypes.UPDATE_MY_ROUTES,
                        myRoutes: res.data.routes.reverse()
                    })
                })
                .catch(e => {
                    console.log(e.message)
                })
    }
}