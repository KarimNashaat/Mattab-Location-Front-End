import React, { useContext } from 'react'
import { Container, Row, Col, Card, CardBody, CardHeader, CardText, Button } from 'reactstrap'
import moment from 'moment'
import "./Route.css"
import defaultAvatar from '../../../assets/images/user-avatar-placeholder.png'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import AuthContext from '../../../context/authContext'

const Route = props => {
    const authContext = useContext(AuthContext)

    const createdAt = moment(props.createdAt).format('MMMM D, YYYY')

    let redButton = null

    if (props.myRoutes) {
        redButton = <Button color="danger" onClick={props.redButtonClick}> Delete </Button>
    }
    else {
        if (!props.myRoute) {
            redButton = <Button color="danger" onClick={props.isAuthanticated ? props.redButtonClick : authContext.toggleModal}
                outline={props.buttonLabel === "Save" ? true : false}> {props.buttonLabel} </Button>

        }
    }

    let avatar = null
    if (props.avatar) {
        const buffer = Buffer.from(props.avatar);
        avatar = buffer.toString('base64')
    }

    let googleMapsLink = "https://www.google.com/maps/dir/"

    for (const checkpoint of props.checkpoints) {
        googleMapsLink = googleMapsLink + checkpoint.lat + "," + checkpoint.long + "/"
    }

    googleMapsLink = googleMapsLink.slice(0, -1);

    console.log(googleMapsLink)

    return (
        <article className="row" style={{ marginBottom: '10px' }}>
            <Col sm='3' md='2'>
                <figure className="thumbnail">
                    <img className="img_btn img-fluid"
                        src={props.avatar ? `data:image/jpeg;base64,${avatar}` : defaultAvatar} style={{ borderRadius: "50%" }}
                        onClick={props.userProfileClicked} />
                </figure>
            </Col>
            <Col sm='9' md='10'>
                <Card>
                    <CardHeader className="text-left">
                        <div className="text-left img_btn"
                            onClick={props.userProfileClicked} style={{ color: "#007bff" }} ><i className="fa fa-user" style={{ color: "black" }}></i> {props.name}</div>
                        <time className="text-left" dateTime="16-12-2014 01:05"><i className="fa fa-clock"></i> {createdAt}</time>
                    </CardHeader>
                    <CardBody className="text-left">
                        <CardText > From: <a style={{ color: "#007bff" }}>{props.from}</a> </CardText>
                        <CardText > To: <a style={{ color: "#007bff" }}>{props.to}</a>  </CardText>
                        <div className='text-right'>
                            {redButton} {' '}
                            <Button color="success"> Go </Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </article>
    )
}

const mapStateToProps = state => {
    return {
        isAuthanticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Route)