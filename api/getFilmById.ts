import axios from "axios"
export default function getFilmById(slug?:string){
    return axios.get(`${process.env.API_URL}/playlist/${slug}`)
}