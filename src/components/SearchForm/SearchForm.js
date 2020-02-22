import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form, Label, Card, Input, FormGroup, Button, CardHeader, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const SearchForm = props => {
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    
    const fetchRoutesHandler = (event) => {
        event.preventDefault()
        props.fetchRoutes({
            from,
            to
        })
    }
    return (
        <Container style={{marginTop:"10px"}}>
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardHeader className="text-left"> <h3> Search </h3></CardHeader>
                        <CardBody>
                            <Form onSubmit={(event) => fetchRoutesHandler(event)}>
                                <FormGroup className="text-left">
                                    <Label className="text-left" for="From">From: </Label>
                                    <Input type="text" name="From" id="From" placeholder="Origin" required
                                    onChange={(event) => setFrom(event.target.value)}/>
                                </FormGroup>
                                <FormGroup className="text-left">
                                    <Label className="text-left" for="To">To: </Label>
                                    <Input type="text" name="To" id="To" placeholder="Destination" 
                                    onChange={(event) => setTo(event.target.value)}/>
                                </FormGroup>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
                                <p className="text-muted text-left mt-3 mb-0"> Example: Try to search from "Banha" </p>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row >
        </Container >
    )
}

const mapDispatchToProps = dispatch => {
    return{
        fetchRoutes: (body) => dispatch(actions.fetchRoutes(body))
    }
}

export default connect(null, mapDispatchToProps)(SearchForm)