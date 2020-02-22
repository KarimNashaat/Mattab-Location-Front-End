import * as actionsTypes from './actionTypes'
// import axios from '../../axios_auth'
import { store } from '../../index'
import axios from 'axios'

export const startRecording = (from, to) => {
    return dispatch => {

        let latitude = 0
        let longitude = 0
        navigator.geolocation.getCurrentPosition((position) => {

            latitude = position.coords.latitude
            longitude = position.coords.longitude

            const initialLocation = {
                lat: latitude,
                long: longitude
            }

            let url = "http://localhost:3030/user/recording"
            const req = {
                from,
                to,
                initialLocation
            }
            console.log(req)
            axios.post(url, req)
                .then(res => {
                    console.log(res)
                    const recordingObject = res.data.recording
                    dispatch({
                        type: actionsTypes.START_RECORDING,
                        from: recordingObject.from,
                        to: recordingObject.to,
                        initialLocation: recordingObject.initialLocation
                    })
                }).catch(e => {
                    console.log("Error: ", e)
                })

        })


    }

}

export const endRecording = (saved) => {
    return {
        type: actionsTypes.END_RECORDING,
        saved
    }
}

export const updateCheckpoints = (checkpoints) => {
    return {
        type: actionsTypes.ADD_CHECKPOINT,
        checkpoints
    }
}

export const continueRecording = (recordingObject) => {
    return {
        type: actionsTypes.CONTINUE_RECORDING,
        recordingData: {
            ...recordingObject,
            recording: true
        }
    }
}

export const toggleSaveModal = () => {
    return {
        type: actionsTypes.TOGGLE_SAVE_MODAL,
        showModal: !store.getState().record.showModal,
        loadingRecording: true
    }

}

export const saveRecord = () => {
    return (dispatch, getState) => {

        let url = process.env.API_URL + "/routes"

        const req = {
            from: getState().record.from,
            to: getState().record.to,
            checkpoints: getState().record.checkpoints,
            initialLocation: getState().record.initialLocation,
        }

        axios.post(url, req)
            .then(res => {
                console.log(res)
                dispatch({
                    type: actionsTypes.UPDATE_MY_ROUTES,
                    myRoutes: res.data.routes.reverse()
                })
                dispatch({
                    type: actionsTypes.START_SAVING_RECORD,
                })

                let url = process.env.API_URL + "/user/recording"
                axios.delete(url)
                    .then(res => {
                        dispatch(endRecording(true))
                    }).catch(e => {
                        // dispatch(endRecording())
                        console.log("Error: ", e.message)
                    })
            }).catch(e => {
                // dispatch(endRecording())
                console.log("Error: ", e.message)
            })
    }
}

export const deleteRecord = () => {
    return dispatch => {

        let url = process.env.API_URL + "/user/recording"

        axios.delete(url)
            .then(res => {
                dispatch(endRecording(false))
            }).catch(e => {
                // dispatch(endRecording())
                console.log("Error: ", e.message)
            })
    }
}

export const checkRecording = () => {
    return dispatch => {

        let url = "http://localhost:3030/user/recording"
        axios.get(url)
            .then(res => {
                console.log(res)
                if (res.data.recording) {
                    dispatch(continueRecording(res.data.recording))
                }
                else {
                    dispatch(endRecording(false))
                }
            }).catch(e => {
                dispatch(endRecording())
                console.log("Error: ", e.message)
            })
    }
}

export const addCheckpoint = () => {
    return dispatch => {
        let url = "http://localhost:3030/user/recording"

        let latitude = 0
        let longitude = 0

        navigator.geolocation.getCurrentPosition((position) => {

            latitude = position.coords.latitude
            longitude = position.coords.longitude

            const checkpoint = {
                lat: latitude,
                long: longitude
            }

            axios.patch(url, checkpoint)
                .then(res => {
                    console.log(res)
                    dispatch(updateCheckpoints(res.data.recording.checkpoints.reverse()))
                }).catch(e => {
                    console.log("Error: ", e)
                })
        })

    }
}

export const deleteCheckpoint = (id) => {
    return dispatch => {
        let url = "http://localhost:3030/user/recording/" + id

        axios.patch(url)
            .then(res => {
                console.log(res)
                dispatch(updateCheckpoints(res.data.recording.checkpoints.reverse()))
            }).catch(e => {
                console.log("Error: ", e)
            })
    }
}
