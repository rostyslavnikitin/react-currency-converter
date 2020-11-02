import React, { Component } from "react";
import Converter from "./converter/converter";
import CurrTable from "./currencyTable/currTable";
import {
    Switch,
    Route,
    withRouter,
    Redirect,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from "./navbar/navbar";

class App extends Component {
    render() {
        const { history } = this.props;
        return (
            <div className="container">
                <Navbar />
                <Switch>
                    <Route
                        history={history}
                        path="/currencies"
                        component={CurrTable} />
                    <Route
                        history={history}
                        path="/converter" component={Converter}
                    />
                    <Redirect from='/' to='/converter'/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
