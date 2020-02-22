import React, { useState } from 'react'
import { Container, Col, Row, Form, Label, Card, Input, FormGroup, Button, CardHeader, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const RecordForm = props => {
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    const startRecordingHandler = event => {
        event.preventDefault()

        props.startRecording(from, to)
    }

    return (
        <Container style={{ marginTop: "10px" }}>
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardHeader style={{ backgroundColor: "#bb2124" }} className="text-left"> <h3 style={{ color: "white" }}> Record </h3></CardHeader>
                        <CardBody>
                            <Form onSubmit={(event) => startRecordingHandler(event)}>
                                <FormGroup className="text-left">
                                    <Label className="text-left" for="From">From: </Label>
                                    <Input type="text" name="From" id="From" placeholder="Origin" required
                                        onChange={event => setFrom(event.target.value)} />
                                </FormGroup>
                                <FormGroup className="text-left">
                                    <Label className="text-left" for="To">To: </Label>
                                    <Input type="text" name="To" id="To" placeholder="Destination" required
                                        onChange={event => setTo(event.target.value)} />
                                </FormGroup>
                                <button className="btn btn-success my-2 my-sm-0" type="submit">Start Recording</button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row >
        </Container >
    )
}

const mapDispatchToProps = dispatch => {
    return {
        startRecording: (from, to) => dispatch(actions.startRecording(from, to))
    }
}

export default connect(null, mapDispatchToProps)(RecordForm)