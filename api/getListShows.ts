import axios from "axios"
export default function getListShows(page?:number){
    if (!page) {
        return axios.get(`${process.env.API_URL}/playlists?type=shows`)
    } else {
        return axios.get(`${process.env.API_URL}/playlists?page=${page}&type=shows`)
    }
}