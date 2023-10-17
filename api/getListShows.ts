import axios from "axios"
export default function getListShows(page?:number){
    if (!page) {
        return axios.get(`${process.env.API_URL}/film?type=1`)
    } else {
        return axios.get(`${process.env.API_URL}/film?page=${page}&type=1`)
    }
}