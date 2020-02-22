import React, { useState, useEffect } from 'react' 
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../store/actions'

const SuccessSave = props => {
    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(prevState => !prevState)
        props.endRecording()
    }

    useEffect(() => {
        console.log(props.saved)
        if(props.saved){
            setShowModal(prevState => !prevState)
        }
    }, [props.saved])

    const goToMyRoutes = () => {
        props.endRecording()
        props.history.push('/myroutes')
    }

    return (
        <Modal isOpen = {showModal} toggle={toggleModal} className='px-0'>
            <ModalBody className="text-center" style={{background:'white'}}>
            <h3 className="py-3 text-center" style ={{color: 'green'}}> Route Saved Successfully <i className="fa fa-check-circle" aria-hidden="true"></i></h3>
            <Button  color='danger' onClick={goToMyRoutes}>
                    Go to My Routes
                </Button>
            </ModalBody>
        </Modal>
    )
}
const mapStateToProps = state =>{
    return {
        saved: state.record.saved
    }
}

const mapDispatchToProps = dispatch => {
    return {
        endRecording: () => dispatch({type: "END_RECORDING"})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SuccessSave))