import React, { Component } from "react";
import "./currTable.css";
import CurrencyConverter from "../currencies";
import { Button } from 'react-bootstrap';
import { MdFavorite } from "react-icons/md";
import { store } from "../store/store";
import { ADD_FAVORITE_CURRENCY, SET_BASE_CURRENCY } from "../store/actions/converter";

export default class CurrTable extends Component {
    constructor(props) {
        super(props);
        this.cv = new CurrencyConverter();
        this.state = { currencies: [], sourceCurrency: store.getState().baseCurrency, rates: {} };
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

    add2fav = (code) => {
        console.log(code)
        store.dispatch({
             type: ADD_FAVORITE_CURRENCY,
             value: code
        });
    };

    render() {
        return (
            <ul className="currTable">
                {/* filter base currency */}
                {this.state.currencies.filter((code) => code !== this.state.sourceCurrency).map((code) => (
                    <li key={code} className={"currencyRow" + (store.getState().favoriteCurrencies.includes(code) ? " currencyFavorite" : "")}>
                        <div className="row">
                            <div className="col-3">{code} ({1/this.state.rates[code]} {this.state.sourceCurrency.toLowerCase()})</div>
                            <div className="col-6">
                                <div className="currencyTableActions">
                                    <Button onClick={() => this.add2fav(code)}><MdFavorite/></Button>
                                    &nbsp;
                                    <Button>make primary</Button>
                            </div></div>

                        </div>


                    </li>
                    ))}
            </ul>
        );
    }
}