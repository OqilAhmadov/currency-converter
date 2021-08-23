import React from 'react'
import { Button, FormControl, Paper, Select, TextField } from '@material-ui/core'
import Axios from 'axios';

import './currency.css'

const Currency = () => {
    const [text, setText] = React.useState(1);
    const [text2, setText2] = React.useState(1);
    const [country, setCountry] = React.useState([]);
    const [country2, setCountry2] = React.useState([]);
    const [value, setValue] = React.useState(1);
    const [value2, setValue2] = React.useState(1);

    React.useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const result = await Axios.get("http://data.fixer.io/api/latest?access_key=7d0c037edf4bcf080bc598cb40573889")
        console.log(result.data);
        setCountry(result.data.rates)
        setCountry2(result.data.rates)
    }

    function convert(e) {
        e.preventDefault();
        let num = (value2 / value) * text;
        setText2(num);
    }

    return (
        <div>
            <Paper className="paper">
                <h3>Currency Converter</h3>
                <form onSubmit={convert}>
                    <div>
                        <TextField variant='outlined' value={text || ""} onChange={(e) => setText(e.target.value)} autoComplete="off" />
                        <FormControl className="dropdown" variant='outlined' onChange={(e) => setValue(e.target.value)}>
                            <Select native>
                                {
                                    Object.keys(country).map((value, index) =>
                                        <option key={index} value={country[value]}>{value}</option>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField variant='outlined' value={text2 || ""} />
                        <FormControl className="dropdown" variant='outlined' onChange={(e) => setValue2(e.target.value)}>
                            <Select native>
                                {
                                    Object.keys(country2).map((value, index) =>
                                        <option key={index} value={country[value]}>{value}</option>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <Button type="submit" className="button" variant="contained">Convert</Button>
                </form>
            </Paper>
        </div>
    )
}
export default Currency;