import axios from "axios";
import {apiKey} from "@/const";

class Api {
    constructor(Apikey) {
        this.Apikey = Apikey
    }
    getAxios = (url, data, callback) => {
        axios.get(url, data)
            .then(function (response) {
                callback(response.data)
            })
            .catch(() => {
                // console.log(error.toJSON().code === 'ERR_NETWORK')
            })
    }
    getByLocation = (location) => {
        console.log(location)
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.Apikey}`)
            .then((data) => {
                return data
            })
    }
    getCoords = (lat,lon) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.Apikey}`)
            .then((data) => {
                return data
            })
    }
}
const api = new Api(apiKey)

export default api
