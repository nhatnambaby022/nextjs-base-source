import axios from "axios"
export default function searchFilm(key:string){
    return axios.get(`${process.env.API_URL}/playlists/search?name=${key}`)
}