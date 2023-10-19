import axios from "axios"
export default function getFilmPopular(){
    return axios.get(`${process.env.API_URL}/film/popular`)
}