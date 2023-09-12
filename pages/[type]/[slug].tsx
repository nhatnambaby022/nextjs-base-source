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
    const [head,setHead] = React.useState(<></>)

    const fetchData = async ()=>{
        const {slug} = router.query
        if (!slug) return
        const response = await getFilmById(slug?.toString());
        if (response.status == 200) {
            setFilmDetails(response.data) 
            setIsLoading(false)
        }
        setHead(<Head>
          <title> {response.data.name} | Popcorn Sound</title> 
          <meta name="description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
  
          <meta property="og:description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
          <meta property="og:image" content={response.data.thumbnail} />
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:creator" content="@PopcornSound" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://popcornsound.com" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
  
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>)
        
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
          <>
            {head}
            <CircularProgress />
          </>
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
            {head}
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
