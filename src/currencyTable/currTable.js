import React, { Component } from "react";
import "./currTable.css";
import { currenciesList, getLatestRate } from "../currencies";
import { Button } from 'react-bootstrap';
import { MdFavorite } from "react-icons/md";
import { store } from "../store/store";
import { Spinner } from 'react-bootstrap';
import { TOGGLE_FAVORITE_CURRENCY, SET_BASE_CURRENCY } from "../store/actions/converter";

export default class CurrTable extends Component {
    constructor(props) {
        super(props);
        this.state = { currencies: [], sourceCurrency: store.getState().baseCurrency, rates: {} };
    }

    componentDidMount() {
        this.setState({ currencies: currenciesList() });
        currenciesList().forEach((code) => {
            this.getRate(code);
        });
    }

    getRate = (code) => {
        getLatestRate(this.state.sourceCurrency, code)
            .then((rate) => {
                this.setState({ rates: { ...this.state.rates, [code]: rate } });
            });
    };

    toggleFav = (code) => {
        store.dispatch({
             type: TOGGLE_FAVORITE_CURRENCY,
             code: code
        });
    };

    setBaseCurrency = (code) => {
      store.dispatch({
          type: SET_BASE_CURRENCY,
          code: code
      })
    };

    isNotBase = (code) => {
        return code !== this.state.sourceCurrency;
    };

    isFav = (code) => {
        return store.getState().favoriteCurrencies.includes(code);
    };

    render() {
        const r = (currencies, className) => {
            return (currencies
                // alphabetically sort
                .sort((code, next) => {
                        if (code < next) {
                            return -1 }
                        else {
                            return 1;
                        }
                    }
                ).map((code) => (
                    <li
                        key={code}
                        className={className}>
                        <div className="row">
                            <div className="col-1">
                                {code}
                            </div>
                            <div className="col-2">
                                {this.state.rates[code] ?
                                    `(${(1/this.state.rates[code]).toFixed(2)}
                                        ${this.state.sourceCurrency.toLowerCase()})`
                                    : <Spinner animation="border" size="sm" />}
                            </div>
                            <div className="col-6">
                                <div className="currencyTableActions">
                                    <Button onClick={() => this.toggleFav(code)}><MdFavorite/></Button>
                                    &nbsp;
                                    <Button onClick={() => this.setBaseCurrency(code)}>make primary</Button>
                                </div></div>

                        </div>
                    </li>
                )));
        };
        return (

            <ul className="currTable">
                favorite currencies: {store.getState().favoriteCurrencies.join(',')}<br/>
                {/* display favourite currencies */}
                {r(
                    this.state.currencies.filter((code) => this.isNotBase(code) && this.isFav(code)),
                    'currencyRow currencyFavorite')}
                {/* display other currencies */}
                {r(
                    this.state.currencies.filter((code) => this.isNotBase(code) && !this.isFav(code)),
                    'currencyRow')}
            </ul>
        );
    }
}

