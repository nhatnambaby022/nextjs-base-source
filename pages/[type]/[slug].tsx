import Head from 'next/head'
import LayOutDefault from '@/components/LayOut/LayOutDefault'
import { CircularProgress } from '@mui/material'
import * as React from 'react';
import { useRouter } from 'next/router';
import ListSound from '@/components/listSound/ListSound';
import getFilmById from '@/api/getFilmById';
import {Helmet} from "react-helmet";
import BoxContainer from '@/components/boxContainer/BoxContainer';
import getFilmPopular from '@/api/getFilmPopular';
export interface Tag{
  id:string,
  name:string,
  thumbnail:string,
  slug?:string,
  soundtrack_count: number,
  author?:string
}
function Container(){
    const router = useRouter()

    const initTag: Tag = {
      id:"",
      name:"",
      thumbnail:"",
      soundtrack_count:0
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const [filmDetails, setFilmDetails] = React.useState(initTag);
    const [listFilmPopular, setListFilmPopular] = React.useState([]); 
    const fetchData = async ()=>{
        const {slug} = router.query
        if (!slug) return
        const response = await getFilmById(slug?.toString());
        if (response.status == 200) {
            setFilmDetails(response.data) 
            setIsLoading(false)
        }
        
    }
    const fetchDataFilmPopular = async ()=>{
      const response = await getFilmPopular();
      if (response.status == 200) {
        setListFilmPopular(response.data.data)
        setIsLoading(false)
      }
      
    }
    React.useEffect(()=>{
      fetchData();
      fetchDataFilmPopular();
    },[router.query.slug])

    if (isLoading) {
        return (
        <CircularProgress />
        )
    }

  if (filmDetails) return (
    <div>
        <div style={{
        width:"100%",
        minWidth:"300px",
        display:"flex",
        flexDirection:"column",
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center",
        justifyItems:"center",
        
        }}>
            
            <ListSound playlist={filmDetails}/>
            <BoxContainer isFilm={true} title="Popular movies" list={listFilmPopular}/>
        </div>
    </div>
  )
  else {
    return(
      <h1 style={{color:"white"}}>Not Found</h1>
    )
  }
}

export default function Sound() {
  return (
    <div>
     
      <LayOutDefault child={<Container />} currentRoute="Home"/>
      
    </div>
  )
}
