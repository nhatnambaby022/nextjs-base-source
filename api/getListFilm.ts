import axios from "axios"
export default function getListFilm(page?:number){
    console.log(`${process.env.API_URL}/playlists`)
    if (!page) {
        return axios.get(`${process.env.API_URL}/playlists?type=movies`)
    } else {
        return axios.get(`${process.env.API_URL}/playlists?page=${page}&type=movies`)
    }
}