import React, {Component} from "react";
import codes from "currency-codes";

export default class Flag extends Component {
    render() {
        return (
            <div
                title={`${codes.code(this.props.flag).currency}`}
                className={`currency-flag currency-flag-${this.props.flag.toLowerCase()}`}
                style={{ 'marginBottom': '-0.15em' }}> </div>
        );
    }
}
