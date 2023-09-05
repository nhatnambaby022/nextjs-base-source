import axios from "axios"
export default function getSeasons(slug?:string){
    return axios.get(`${process.env.API_URL}/season?playlists=${slug}`)
}