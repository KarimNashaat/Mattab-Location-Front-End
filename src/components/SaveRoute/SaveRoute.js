import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../UI/Spinner/Spinner'
import SuccessSave from './SuccessSave/SuccessSave'

const SaveRoute = props => {
    const toggle = () => {
        props.toggleSaveModal()
    }

    let modalInfo = (<React.Fragment>
        <ModalBody  style={{background:'white'}}>
            <p>Are you sure that you finished recording ?</p>
        </ModalBody>
        <ModalFooter className='card-footer'  style={{background:'white'}}>
            <Button outline color="success" onClick={props.saveRoute}> Save </Button>{' '}
            <Button outline color="danger" onClick={props.deleteRoute}> Delete Route</Button>
        </ModalFooter>
    </React.Fragment>)
    

    return (
        <React.Fragment>
        <Modal isOpen={props.showModal} toggle={toggle} className='py-auto px-0'>
            <div className='card-header text-white bg-info' >
                <h4 className='py-2' style={{ display: 'inline-block' }}> Finished Recording </h4>
                <button type="button" className="close text-right" data-dismiss="modal" aria-label="Close"
                    onClick={toggle}>
                    <span aria-hidden="true" className="text-right" style={{ color: "white" }}>&times;</span>
                </button>
            </div>
            {/* </ModalHeader> */}

            {modalInfo}
            
        </Modal>
        <SuccessSave/>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        showModal: state.record.showModal,
        loading: state.record.loadingForSave
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSaveModal: () => dispatch(actions.toggleSaveModal()),
        saveRoute: () => dispatch(actions.saveRecord()),
        deleteRoute: () => dispatch(actions.deleteRecord())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaveRoute)