export const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        token: action.token,
        error: null,
        user: action.user,
        myRoutes: action.routes,
        savedRoutes: action.savedRoutes
    }
}

export const addCheckpoint = (state, action) => {
    const updatedCheckpoints = [
        ...state.checkpoints,
        action.checkpoint
    ]
    return {
        ...state,
        checkpoints: [...updatedCheckpoints]
    }
}

export const deleteCheckpoint = (state, action) => {
    const updatedCheckpoints = state.checkpoints.filter(checkpoint => checkpoint.id !== action.id)
    return {
        ...state,
        checkpoints: [...updatedCheckpoints]
    }
}

export const startRecording = (state, action) => {
    return {
        ...state,
        from: action.from,
        to: action.to,
        recording: true,
        initialLocation: action.initialLocation,
        saved: false
    }
}