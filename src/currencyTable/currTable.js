import React, { Component } from "react";
import "./currTable.css";
import CurrencyConverter from "../currencies";

export default class CurrTable extends Component {
    constructor(props) {
        super(props);
        this.cv = new CurrencyConverter();
        this.state = { currencies: [], sourceCurrency: "UAH", rates: {} };
    }

    componentDidMount() {
        this.setState({ currencies: this.cv.currenciesList() });
        this.cv.currenciesList().forEach((code) => {
            this.getRate(code);
        });
        console.log('rates: ', this.state.rates)
    }

    getRate = (code) => {
        this.cv.getLatestRate(this.state.sourceCurrency, code)
            .then((rate) => {
                console.log(code, rate);
                this.setState({ rates: { ...this.state.rates, [code]: rate } });
            });
    };

    render() {
        return (
            <ul class="currTable">
                {this.state.currencies.map((code) => (<li key={code}>{code} ({1/this.state.rates[code]})</li>))}
            </ul>
        );
    }
}