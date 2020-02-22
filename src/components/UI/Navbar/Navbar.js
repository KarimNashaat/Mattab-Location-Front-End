import React, { useContext } from 'react'
import authContext from '../../../context/authContext'
import { NavLink, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

const Navbar = props => {
    const AuthContext = useContext(authContext)

    const checkAuthentication = () => {
        if (!AuthContext.isAuthanticated){
            AuthContext.toggleModal()
            props.authRedirect('/record')
        }
    }

    const logout = () =>{ 
        props.logout()
        props.endRecording()
        props.resetRoutes()
    }

    let loggedInButton = <button className="btn btn-sm btn-outline-secondary mr-sm-2" style={{ float: 'right' }} type="button" onClick={AuthContext.toggleModal}>Login</button>
    let userRoutes = null

    if (AuthContext.isAuthanticated) {
        loggedInButton = <button className="btn btn-sm btn-outline-secondary mr-sm-2" style={{ float: 'right' }} type="button"
            onClick={logout}>Logout</button>

        userRoutes = <React.Fragment>
            {/* <li className="nav-item">
                <NavLink className="nav-link" to='/record'> Record</NavLink>
            </li> */}
            <li className="nav-item">
                <NavLink className="nav-link" to='/myroutes'> My routes</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to='/savedroutes'> Saved routes</NavLink>
            </li>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-* navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>

                {loggedInButton}
                {/* <a className="btn btn-sm btn-outline-secondary"><i className="w3-margin-left fa fa-search"></i></a> */}

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0" data-toggle="collapse" data-target="#navbarTogglerDemo03">
                        <li className="nav-item" >
                            <NavLink className="nav-link" to='/' exact>Home</NavLink>
                            <NavLink className="nav-link" onClick={checkAuthentication} to='/record' exact>ٌRecord</NavLink>
                            <NavLink className="nav-link" to='/search' exact>Search</NavLink>
                            <hr />
                        </li>

                        {userRoutes}
                    </ul>
                    {/* <NavLink to='/search'>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </NavLink> */}
                    

                </div>
            </nav>
        </React.Fragment>
    )
}

const mapDispatchToprops = dispatch => {
    return {
        authRedirect: (path) => dispatch(actions.authRedirection(path)), 
        logout: () => dispatch(actions.logOut()),
        endRecording: () => dispatch(actions.endRecording()),
        resetRoutes: () => dispatch(actions.resetRoutes())
    }
}

export default connect(null, mapDispatchToprops)(withRouter(Navbar))