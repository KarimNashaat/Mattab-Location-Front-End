import React from 'react'
import Routes from '../../components/Routes/Routes'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const MyRoutes = props => {
    const header = <h2 className="pb-2 mt-4 mb-2 border-bottom text-left">My Routes</h2>
    let resultMsg = "You did not record any route yet"

    let myRoutes = null
    if (props.myRoutes) {
        myRoutes = props.myRoutes.map(route => {
            route.click = props.deleteRoute
            return route
        })
    }

    return (
        <React.Fragment>
            <Routes fetchedRoutes={myRoutes}
                header={header}
                resultMsg={resultMsg}
                myRoutes />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        myRoutes: state.auth.myRoutes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteRoute: (route) => dispatch(actions.deleteRoute(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutes)