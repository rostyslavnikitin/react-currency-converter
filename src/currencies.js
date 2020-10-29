import axios from "axios";

class CurrencyConverter {
    currenciesList() {
        return [
            "CAD","HKD","ISK","PHP","DKK","HUF","CZK","AUD","RON","SEK","IDR","INR","BRL","RUB","HRK",
            "JPY","THB","CHF","SGD","PLN","BGN","TRY","CNY","NOK","NZD","ZAR","USD","MXN","ILS","GBP","KRW","MYR","UAH"
        ];
    }

    async getLatestRate(fromcode, tocode) {
        const res = await axios.get(`/getlatest/${fromcode}/${tocode}`);
        return res.data
    }
}

export default CurrencyConverter;
