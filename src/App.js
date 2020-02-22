import React, { useState, useEffect } from 'react';
import './App.css';

import { connect } from 'react-redux'
import { BrowserRouter, Switch, Link, Route, Redirect, withRouter } from 'react-router-dom'

import Auth from './components/Auth/Auth'
import * as actions from './store/actions'
import Layout from './containers/Layout/Layout';
import AuthModalContext from './context/authContext'
import Home from './components/Home/Home'
import Search from './containers/Search/Search';
import Record from './containers/Record/Record'
import Profile from './components/Profile/Profile'
import './axios_auth'
import SuccessSave from './components/SaveRoute/SuccessSave/SuccessSave';
import MyRoutes from './containers/MyRoutes/MyRoutes';
import SavedRoutes from './containers/SavedRoutes/SavedRoutes';
import Playground from './playgroud';

function App(props) {
  const [showModal, setModal] = useState(false)

  useEffect(() => {
    props.onTrySignIn()
  }, [])

  useEffect(() => {
    if (props.authRedirectionPath === '/record' && props.isAuthanticated) {
      props.history.push(props.authRedirectionPath)
      props.authRedirect(null)
    }
  }, [props.isAuthanticated])

  const toggleModal = () => {
    setModal(!showModal)
  }

  if (props.isAuthanticated && showModal) {
    setModal(false)
  }

  let routes = null
  if (!props.isAuthanticated) {
    routes = <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/search' exact component={Search} />
      {/* <Route path='/record' exact component={Record} /> */}
      <Redirect to='/' />
    </Switch>
  }
  else {
    routes = <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/search' exact component={Search} />
      <Route path='/record' exact component={Record} />
      <Route path='/myroutes' exact component={MyRoutes} />
      <Route path='/savedroutes' exact component={SavedRoutes} />
    </Switch>
  }
  return (
    <div className="App">
      <Playground/>
      <AuthModalContext.Provider value={{ toggleModal, logout: props.logout, isAuthanticated: props.isAuthanticated }}>
        <Layout>
          {routes}
        </Layout>
      </AuthModalContext.Provider>
      {/* <Footer/> */}


      {/* <button onClick={toggleModal}> Show Modal </button> */}

      {!props.isAuthanticated ? <Auth
        showModal={showModal}
        toggleModal={toggleModal}
        signInForm={props.signInForm}
        toggleAuthForm={props.toggleAuthForm} /> : null}

      {props.showUserModal ? <Profile /> : null}
    </div>

  );
}

const mapStateToProps = state => {
  return {
    isAuthanticated: state.auth.token !== null,
    signInForm: state.auth.signInForm,
    authRedirectionPath: state.auth.redirectPath,
    showUserModal: state.user.showUserModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAuthForm: () => dispatch(actions.authFormToggle()),
    logout: () => dispatch(actions.logOut()),
    authRedirect: (path) => dispatch(actions.authRedirection(path)),
    onTrySignIn: () => dispatch(actions.onTrySignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
