import axios from "axios"
export default function getListFilm(page?:number){
    if (!page) {
        return axios.get(`http://localhost:5000/films?page=1`)
        // return axios.get(`${process.env.API_URL}/playlists?type=movies`)
    } else {
        return axios.get(`http://localhost:5000/films?page=1`)
        // return axios.get(`${process.env.API_URL}/playlists?page=${page}&type=movies`)
    }
}