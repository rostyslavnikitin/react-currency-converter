import axios from "axios";

class CurrencyConverter {
    async currenciesList() {
        const res = await axios.get("/currencies");
        return res.data.split('\n');
    }

    async getLatestRate(fromcode, tocode) {
        const res = await axios.get(`/getlatest/${fromcode}/${tocode}`);
        console.log(res.data);
        return res.data
    }
}

export default CurrencyConverter;
