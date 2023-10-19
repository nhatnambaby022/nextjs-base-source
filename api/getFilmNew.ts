import axios from "axios"
export default function getFilmNew(){
    return axios.get(`${process.env.API_URL}/film/new`)
}