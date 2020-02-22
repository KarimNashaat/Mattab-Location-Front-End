import React, { useState } from 'react'
import './Profile.css'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { connect } from 'react-redux'
import Spinner from '../UI/Spinner/Spinner'
import * as actions from '../../store/actions'
import defaultAvatar from '../../assets/images/user-avatar-placeholder.png'
import classes from './Profile.css'

const Profile = props => {

    let profileCard = <Spinner />

    if (!props.loading) {
        profileCard = (
            <div className="card-container">
                <div className="upper-container">
                    <div className="image-container">
                        <img className="img-fluid"
                            src={props.user.avatar ? `data:image/png;base64,${props.user.avatar}` : defaultAvatar} style={{ borderRadius: "50%" }} />
                    </div>
                </div>

                <div className="lower-container">
                    <div>
                        <h3 style={{ marginTop: "25px" }}>{props.user.name}</h3>
                        <h4> {props.user.job ? props.user.job : null} </h4>
                        <hr />
                    </div>
                    <div>
                        <p>Email: {props.user.email} <br />
                            {props.user.age ? "Age: " + props.user.age : null} <br />
                            {props.user.phone ? "Phone: " + props.user.phone : null} <br />
                        </p>
                    </div>
                    <div>
                        <button className="btn" onClick={props.toggleUserModal}>Back</button>
                    </div>
                </div>
            </div>)
    }
    return (
        <Modal isOpen={props.showUserModal} toggle={props.toggleUserModal}
        >
            {profileCard}

        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        showUserModal: state.user.showUserModal,
        loading: state.user.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleUserModal: () => dispatch(actions.toggleUserModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)