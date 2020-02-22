import React from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, CardText, Button } from 'reactstrap'
import moment from 'moment'

const Checkpoint = props => {
    const createdAt= moment(props.createdAt).format('H:mm:s A MMMM D, YYYY') 

    return (
        <article className="row" style={{ marginBottom: '10px' }}>
        <Col sm='2'>
            <figure className="thumbnail">
                <i className="fa fa-map-marker-alt fa-4x"></i>
            </figure>
        </Col>
        <Col sm='10'>
            <Card>
                <CardHeader className="text-left">
                    <time className="text-left"><i className="fa fa-clock"></i> {createdAt}</time>
                </CardHeader>
                <CardBody className="text-left">
                    <CardText > Saved Checkpoint </CardText>
                    <p className='text-right'> <Button color="danger" onClick={props.delete}> Delete </Button></p>
                </CardBody>
            </Card>
        </Col>
    </article>
    )
}

export default Checkpoint