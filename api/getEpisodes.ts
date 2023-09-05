import axios from "axios"
export default function getEpisodes(playlist?:string,season?:string){
    return axios.get(`${process.env.API_URL}/episode?playlists=${playlist}&season=${season}`)
}