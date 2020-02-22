import React from 'react'
import Navbar from '../../components/UI/Navbar/Navbar'
import Footer from '../../components/UI/Footer/Footer'

const Layout = props => {
    return (
        <React.Fragment>
            <div className="container-fluid d-flex flex-column px-0">
                <div className="row no-gutters">
                    <div className="col">
                    <Navbar></Navbar>
                    </div>
                </div>
                <div className="row flex-grow-1 d-flex no-gutters">
                    {props.children}
                </div>
                <div className="row align-items-end no-gutters">
                    <Footer />
                </div>
            </div>

        </React.Fragment>
    )
}

export default Layout