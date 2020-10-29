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
import './App.css';

class App extends Component {
    render() {
        const { history } = this.props;
        return (
            <div className="App">
                <header className="x">
                    <Link to="/converter">Converter</Link>
                    <Link to="/currencies">Currencies list</Link>
                </header>
                <Switch>
                    <Route history={history} path="/currencies" component={CurrTable} />
                    <Route history={history} path="/converter" component={Converter} />
                    <Redirect from='/' to='/converter'/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
