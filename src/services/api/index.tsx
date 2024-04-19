import axios from "axios";

// Default is https://restcountries.com/v3.1/all to get all countrys
const baseURL = 'https://restcountries.com/v3.1/'

const api = axios.create({
    baseURL,
    timeout: 1000,
})

export default api