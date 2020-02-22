import React from 'react'
import { Container, Row, Col} from 'reactstrap'
import Checkpoint from '../Checkpoints.js/Checkpoint/Checkpoint'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const Checkpoints = props => {
    let checkpoints = null

    if(props.checkpoints) {
        checkpoints = props.checkpoints.map(checkpoint => {
            return <Checkpoint key={checkpoint._id} createdAt ={checkpoint.createdAt}
            delete={() => props.deleteCheckpoint(checkpoint._id)}/>
        })
    }
    return (
        <Container>
            <Row>
                <Col sm='8'>
                    <h2 className="pb-2 mt-4 mb-2 border-bottom text-left">Checkpoints ({ checkpoints ? checkpoints.length : 0 }) </h2>
                    {checkpoints}
                </Col>
            </Row >
        </Container >
    )

}

const mapStateToProps = state => {
    return {
        checkpoints: state.record.checkpoints
    }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteCheckpoint: (id) => dispatch(actions.deleteCheckpoint(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkpoints)