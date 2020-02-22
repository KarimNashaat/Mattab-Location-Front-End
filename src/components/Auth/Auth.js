import React from 'react'
import Login from './Login/Login'
import Register from './Sign-up/Register'
import { Modal } from 'reactstrap'

const Auth = props => {
    return (
        <Modal isOpen={props.showModal} toggle={props.toggleModal}>
            {props.signInForm ? <Login clicked={props.toggleAuthForm} /> : <Register clicked={props.toggleAuthForm} />}
        </Modal>)
}

export default Auth