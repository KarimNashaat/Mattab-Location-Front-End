import React, { useEffect } from 'react'
import SearchForm from '../../components/SearchForm/SearchForm'
import Routes from '../../components/Routes/Routes'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const Search = props => {
    const header = <h2 className="pb-2 mt-4 mb-2 border-bottom text-left">Results</h2>
    let resultMsg = "No matches found"

    useEffect(() => {
        props.resetRoutes()
    }, [])

    let fetchedRoutes = null
    if (props.fetchedRoutes) {
        fetchedRoutes = props.fetchedRoutes.map(route => {
            if (props.savedRoutes) {
                if (props.savedRoutes.some(savedRoute => route._id === savedRoute._id )) {
                    route.click = props.unsaveRoute
                    route.label = "Un-Save"
                }
                else {
                    route.click = props.saveRoute
                    route.label = "Save"
                }
            }
            else {
                route.click = props.saveRoute
                route.label = "Save"
            }
            if(route.owner_id === (props.userId)) {
                route.myRoute = true
            }

            return route
        })
    }
    return (
        <React.Fragment>
            <SearchForm />
            <Routes fetchedRoutes={fetchedRoutes}
                header={header}
                resultMsg={resultMsg}
            />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        fetchedRoutes: state.route.routes,
        savedRoutes: state.auth.savedRoutes,
        userId: state.auth.user ? state.auth.user._id : null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveRoute: (route) => dispatch(actions.saveRoute(route)),
        unsaveRoute: (route) => dispatch(actions.unsaveRoute(route)),
        resetRoutes: () => dispatch(actions.resetRoutes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)