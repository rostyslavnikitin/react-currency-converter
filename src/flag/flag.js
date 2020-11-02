import React, {Component} from "react";
import codes from "currency-codes";
import "./flag.css";

export default class Flag extends Component {
    render() {
        return (
            <div
                title={`${codes.code(this.props.flag).currency}`}
                className={`flag currency-flag currency-flag-${this.props.flag.toLowerCase()}`}
            > </div>
        );
    }
}
