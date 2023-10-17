import axios from "axios"
export default function getListFilm(page?:number){
    if (!page) {
        return axios.get(`${process.env.API_URL}/film?type=2`)
    } else {
        return axios.get(`${process.env.API_URL}/film?page=${page}&type=2`)
    }
}