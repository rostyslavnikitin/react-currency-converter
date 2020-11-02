import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <b className="navbar-brand">Currency converter</b>
                <div className="navbar" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link
                            to="/converter"
                            className={`nav-item nav-link ${window.location.pathname === '/converter' ? 'active' : ''}`}
                        >Converter</Link>
                        <Link
                            to="/currencies"
                            className={`nav-item nav-link ${window.location.pathname === '/currencies' ? 'active' : ''}`}
                        >Currencies list</Link>
                        {this.props.location}
                    </div>
                </div>
            </nav>
        );
    }
}

