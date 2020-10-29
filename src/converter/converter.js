import React, { Component } from "react";
import CurrencyConverter from "../currencies";

export default class Converter extends Component {
    constructor(props) {
        super(props);
        this.cv = new CurrencyConverter();

        this.state = { currencies: [], valueFrom: 100, rate: 0, currSource: "USD", currDest: "UAH" };

        this.s_ref = React.createRef();
        this.d_ref = React.createRef();
    }

    updateResult = async () => {
        const data = await this.cv.getLatestRate(this.state.currSource, this.state.currDest);
        this.setState({ rate: data });
    };

    componentDidMount = async () => {
        await this.setState({ currencies: this.cv.currenciesList() });
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
                    from: <b>{this.state.currSource}</b><br/>
                    to: <b>{this.state.currDest}</b><br/>
                    rate: <b>{this.state.rate}</b><br/>
                    buyRate: <b>{1/this.state.rate}</b>
                </div>
                <form>
                    <input name="c_from" value={this.state.valueFrom} onChange={this.fromValueChange} type="number" />
                    <select value={this.state.currSource} name="from" onChange={this.fromCurrChange}>
                        {this.state.currencies.map((code) => (<option value={code} key={code}>{code}</option>))}
                    </select>
                    <input name="c_to" readOnly="readOnly" value={this.state.valueFrom * this.state.rate}/>
                    <select value={this.state.currDest} name="to" onChange={this.toCurrChange}>
                        {this.state.currencies.map((code) => (<option value={code} key={code}>{code}</option>))}
                    </select>
                </form>
            </div>
        );
    }
}
