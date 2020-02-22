import * as actionTypes from '../actions/actionTypes'
import { addCheckpoint, deleteCheckpoint, startRecording } from '../utility'

const initialState = {
    recording: false,
    from: null,
    to: null,
    checkpoints: null,
    initialLocation: null,
    showModal: false,
    loadingRecording: true,
    loadingForSave: true,
    saved: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONTINUE_RECORDING:
            return { ...state, ...action.recordingData, loadingRecording: false }
        case actionTypes.START_RECORDING:
            return startRecording(state, action)
        case actionTypes.ADD_CHECKPOINT:
            return { ...state, checkpoints: action.checkpoints }
        case actionTypes.DELETE_CHECKPOINT:
            return deleteCheckpoint(state, action)
        case actionTypes.TOGGLE_SAVE_MODAL:
            return { ...state, showModal: action.showModal }
        case actionTypes.START_SAVING_RECORD:
            return { ...state, loadingRecording: true, showModal: false}
        case actionTypes.END_RECORDING:
            return { ...initialState, saved: action.saved, loadingRecording: false }
        default:
            return state
    }
}

export default reducer