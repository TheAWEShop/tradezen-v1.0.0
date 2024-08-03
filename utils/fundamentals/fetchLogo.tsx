import axios from "axios"



export const fetchLogo = async () => {

    const url = 'https://api.twelvedata.com/logo?symbol=${stock}&apikey=77c05afbaac14e4f8d02c61e1a12b0ea`

    const response = await axios.get(url);
    const data = response.data
    return data

}