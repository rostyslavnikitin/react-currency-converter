import React, { Component } from "react";
import currencies from "../currencies";
export default class Converter extends Component {
    render() {
        const currenciesOptions = [];

        for(let c of currencies) {
            currenciesOptions.push(<option value={c}>{c}</option>)
        }

        return (
            <div>
                <form>
                    <input name="c_from"/>
                    <select name="from">
                        {currenciesOptions}
                    </select>
                    <input name="c_to" readOnly="readOnly"/>
                    <select name="to">
                        {currenciesOptions}
                    </select>
                </form>
            </div>
        );
    }
}
