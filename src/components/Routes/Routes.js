import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Route from './Route/Route'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const Routes = props => {
    let routes = null

    const userProfileClicked = (id) => {
        props.fetchUser(id)
    }

    let resultMsg = <h4 className="text-left text-muted"> {props.resultMsg} </h4>

    if (props.fetchedRoutes) {
        if (props.fetchedRoutes.length) {
            routes = props.fetchedRoutes.map((route, index) => {

                return <Route
                    key={route._id}
                    from={route.from}
                    to={route.to}
                    createdAt={route.createdAt}
                    checkpoints={route.checkpoints.reverse()}
                    name={route.ownerName}
                    avatar = {route.ownerImg}
                    userProfileClicked={() => userProfileClicked(route.owner_id)}
                    myRoutes={props.myRoutes}
                    buttonLabel = {route.label ? route.label : props.buttonLabel} 
                    redButtonClick ={() => route.click(route)}
                    myRoute={route.myRoute}/>
            })

            resultMsg = null
        }
    }
    else {
        resultMsg = null
    }


    return (
        <Container>
            <Row>
                <Col sm='10' md='8'>
                    {props.header}
                    {routes}
                    {resultMsg}
                </Col>
            </Row >
        </Container >
    )

}

// const mapStateToProps = state => {
//     return {
//         fetchedRoutes: state.route.routes
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        fetchRoutes: () => dispatch(actions.fetchRoutes()),
        fetchUser: (id) => dispatch(actions.fetchUser(id))
    }
}

export default connect(null, mapDispatchToProps)(Routes)