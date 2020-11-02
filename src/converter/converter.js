import React, { Component } from "react";
import { currenciesList, getLatestRate } from "../currencies";
import Flag from "../flag/flag";
import { store } from "../store/store";

export default class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = { currencies: [], valueFrom: 100, rate: 0, currSource: store.getState().baseCurrency, currDest: "USD" };
        this.s_ref = React.createRef();
        this.d_ref = React.createRef();
    }

    updateResult = async () => {
        const data = await getLatestRate(this.state.currSource, this.state.currDest);
        this.setState({ rate: data });
    };

    componentDidMount = async () => {
        await this.setState({ currencies: currenciesList() });
        await this.updateResult();
    };

    // handle original amount value changing
    fromValueChange = async (event) => {
        await this.setState({ valueFrom: event.target.value });
    };

    // handle source currency change
    fromCurrChange = async (event) => {
        await this.setState({ currSource: event.target.value});
        await this.updateResult();
    };

    // handle dest currency change
    toCurrChange = async (event) => {
        await this.setState({ currDest: event.target.value });
        await this.updateResult();
    };

    render() {
        return (
            <div>
                <div>
                    from: <b>{this.state.currSource}</b>&nbsp;<Flag flag={this.state.currSource} />
                    <br/>
                    to: <b>{this.state.currDest}</b>&nbsp;<Flag flag={this.state.currDest} />
                    <br/>
                    rate: <b>{this.state.rate.toFixed(3)}</b>
                    <br/>
                    buyRate: <b>{(1/this.state.rate).toFixed(2)}</b>
                    <br/>
                    base currency: {store.getState().baseCurrency}&nbsp;<Flag flag={store.getState().baseCurrency} />
                    <br/>
                    favorite currencies: {store.getState().favoriteCurrencies.join(',')}<br/>
                </div>
                <form>
                    <div className="row">
                        <div className="col-1" style={{ marginTop: '0.3em' }}>Change</div>
                        <div className="col-2">
                            <input
                                className="form-control"
                                name="c_from"
                                value={this.state.valueFrom}
                                onChange={this.fromValueChange} type="number"
                            />
                        </div>
                        <div className="col-2">
                            <select
                                className="form-control"
                                value={this.state.currSource}
                                name="from"
                                onChange={this.fromCurrChange}
                            >
                                {this.state.currencies.map((code) => (<option value={code} key={code}>{code}</option>))}
                            </select>
                        </div>
                        <div className="col-1" style={{ marginTop: '0.3em' }}>TO</div>
                        <div className="col-2">
                            <input
                                className="form-control"
                                name="c_to"
                                readOnly="readOnly"
                                value={this.state.valueFrom * this.state.rate}
                            />
                        </div>
                        <div className="col-2">
                            <select
                                className="form-control"
                                value={this.state.currDest}
                                name="to"
                                onChange={this.toCurrChange}
                            >
                                {this.state.currencies.map((code) => (
                                    <option value={code} key={code}>{code}</option>)
                                )}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
