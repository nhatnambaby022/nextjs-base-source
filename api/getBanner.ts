import axios from "axios"
export default function getBanner(){
    return axios.get(`${process.env.API_URL}/film/banner`)
}
