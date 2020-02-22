import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Routes from '../../components/Routes/Routes'
import * as actions from '../../store/actions'

const SavedRoutes = props => {
    const header = <h2 className="pb-2 mt-4 mb-2 border-bottom text-left">Saved Routes</h2>
    let resultMsg = "You have no saved routes"

    let savedRoutes = null

    if(props.savedRoutes) {
        savedRoutes = props.savedRoutes.map( route => {

            route.click = props.unsaveRoute
            route.label = "Un-Save"
            return route
        })
    }

    return (
        <React.Fragment>
            <Routes fetchedRoutes={savedRoutes}
            header={header}
            resultMsg={resultMsg}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        savedRoutes: state.auth.savedRoutes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unsaveRoute: (id) => dispatch(actions.unsaveRoute(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedRoutes)