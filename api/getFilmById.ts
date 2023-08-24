import axios from "axios"
export default function getFilmById(id?:string){
    return axios.get(`${process.env.API_URL}/playlistsbyid/${id}`)
}