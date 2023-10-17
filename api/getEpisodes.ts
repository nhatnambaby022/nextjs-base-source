import axios from "axios"
export default function getEpisodes(playlist?:string,season?:string){
    return axios.get(`${process.env.API_URL}/episode?film=${playlist}&season=${season}`)
}