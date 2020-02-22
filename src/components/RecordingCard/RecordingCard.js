import React from 'react'
import { Container, Col, Row, Form, Label, Card, CardText, Input, FormGroup, Button, CardHeader, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const RecordingCard = props => {
    return (
        <Container style={{marginTop:"10px"}}>
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardHeader style={{backgroundColor: "green"}} className="text-left"> <h3 style={{color: "white"}}> Recording... </h3></CardHeader>
                        <CardBody>
                        <CardText > From: <a style={{ color: "#007bff" }}>{props.from}</a> </CardText>
                        <CardText > To: <a style={{ color: "#007bff" }}>{props.to}</a>  </CardText>
                        <div>
                            <Button color="danger mx-auto" onClick={props.toggleSaveModal}> End </Button>{' '}
                            <Button color="success mx-auto" onClick={props.addCheckpoint}> Checkpoint </Button>
                        </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row >
        </Container >
    )
}

const mapStateToProps = state => {
    return{
        from: state.record.from,
        to: state.record.to
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCheckpoint: () => dispatch(actions.addCheckpoint()),
        toggleSaveModal: () => dispatch(actions.toggleSaveModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordingCard)