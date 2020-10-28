import React, { Component } from "react";
import CurrencyConverter from "../currencies";

export default class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount () {
        const cv = new CurrencyConverter();
        cv.currenciesList()
            .then(data =>  {
                this.setState({data});
            });
    }

    render() {


        return (
            <div>
                <form>
                    <input name="c_from"/>
                    <select name="from">
                        {this.state.data.map((code) => (<option value={code} key={code}>{code}</option>))}
                    </select>
                    <input name="c_to" readOnly="readOnly"/>
                    <select name="to">
                        {this.state.data.map((code) => (<option value={code} key={code}>{code}</option>))}
                    </select>
                </form>
            </div>
        );
    }
}
