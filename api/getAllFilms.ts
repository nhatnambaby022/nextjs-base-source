import axios from "axios"
export default function getAllFilms(playlist?:string,season?:string){
    return axios.get(`${process.env.API_URL}/film?type=2`)
}
