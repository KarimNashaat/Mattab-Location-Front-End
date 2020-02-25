import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthContext from '../../context/authContext'
import * as actions from '../../store/actions'

const Intro = props => {
    const authContext = useContext(AuthContext)

    const checkAuthentication = () => {
        if (!authContext.isAuthanticated){
            authContext.toggleModal()
            props.authRedirect('/record')
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="span12">
                    <div className="hero-unit center">
                        <h1>Mattab Location </h1>
                        <br />
                        <p> This website application makes your journies with your car safe by saving the locations of the Mattabat on the road, so you can avoid them in the future.</p>
                        <p><b>Go now and record a new route or search for a one</b></p>
                        <NavLink to='/record'> <button className="btn btn-danger btn-info " style={{marginRight: "10px"}} onClick={checkAuthentication}><i className="icon-home icon-white"></i> Record </button></NavLink>
                        <NavLink to='/search' className="btn btn-large btn-info"><i className="icon-home icon-white"></i> Search <i className='fa fa-search'></i></NavLink>
                    </div>
                    <br />
                    {/* <!-- By ConnerT HTML & CSS Enthusiast -->   */}
                    <p className='text-muted'>
                        **If you are using Safari browser, go to Setting > Safari > Block Pop-ups turn it off to enable the app to use google maps.
                    </p>
                </div>
            </div>
        </div>

    )
}

const mapDispatchToprops = dispatch => {
    return {
        authRedirect: (path) => dispatch(actions.authRedirection(path)) 
    }
}
export default connect(null, mapDispatchToprops)(Intro)