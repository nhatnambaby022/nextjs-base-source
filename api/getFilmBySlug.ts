import axios from "axios"
export default function getFilmBySlug(slug?:string){
    return axios.get(`${process.env.API_URL}/film/slug?slug=${slug}`)
}