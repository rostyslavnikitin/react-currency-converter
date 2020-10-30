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

    render() {
        return (
            <ul className="currTable">
                favorite currencies: {store.getState().favoriteCurrencies.join(',')}<br/>
                {/* filter base currency */}
                {this.state.currencies
                    // place favorites to the top of the page
                    .sort((code) => {
                            if (store.getState().favoriteCurrencies.includes(code)) {
                                return -1 }
                            else {
                                return 1;
                            }
                        }
                    ).filter((code) => code !== this.state.sourceCurrency).map((code) => (
                    <li key={code} className={"currencyRow" + (store.getState().favoriteCurrencies.includes(code) ? " currencyFavorite" : "")}>
                        <div className="row">
                            <div className="col-3">
                                {code} {this.state.rates[code] ?
                                    `(${(1/this.state.rates[code]).toFixed(2)} ${this.state.sourceCurrency.toLowerCase()})`
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
                    ))}
            </ul>
        );
    }
}

