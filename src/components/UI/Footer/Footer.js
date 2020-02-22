import React from 'react'

const Footer = props => {
    return (
        // < !--Footer -- >
        <footer className="footer font-small blue" style={{position:'relative', bottom:0, margin:"auto"}}>

            {/* <!-- Copyright --> */}
            <div className="footer-copyright text-center py-3 text-muted">© 2020 Copyright:  
                  <i className='fab fa-github'> </i><a className="text-muted" href="https://github.com/KarimNashaat?tab=repositories" target="_blank"> github.com/KarimNashaat</a>
            </div>
            {/* <!-- Copyright --> */}

        </footer>
        // <!--Footer -->
    )
}

export default Footer