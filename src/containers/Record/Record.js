import React, { useEffect } from 'react'
import RecordForm from '../../components/RecordForm/RecordForm'
import Checkpoints from '../../components/Checkpoints.js/Checkpoints'
import RecordingCard from '../../components/RecordingCard/RecordingCard'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import SaveRoute from '../../components/SaveRoute/SaveRoute'
import Spinner from '../../components/UI/Spinner/Spinner'

const Record = props => {
    useEffect(() => {
        props.checkRecording()
    }, [])

    const recordingPage = <React.Fragment>
        <RecordingCard /> <Checkpoints />
    </React.Fragment>

    return (
        <React.Fragment>
            <SaveRoute/>
            { props.loading ? <Spinner/> : props.recording ? recordingPage : <RecordForm />}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        recording: state.record.recording,
        loading: state.record.loadingRecording
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkRecording: () => dispatch(actions.checkRecording())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Record)