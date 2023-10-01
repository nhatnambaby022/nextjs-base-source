import axios from "axios"
export default function getMovie(id?:string){
    return axios.get(`${process.env.THE_MOVIE_DB}/movie/${id}?api_key=${process.env.API_KEY}`)
}
