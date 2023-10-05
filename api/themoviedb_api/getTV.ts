import axios from "axios"
export default function getTV(id?:string){
    return axios.get(`${process.env.THE_MOVIE_DB}/tv/${id}?api_key=${process.env.API_KEY}`)
}
