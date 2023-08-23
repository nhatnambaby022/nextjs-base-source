import getFilmBySlug from '@/api/getFilmBySlug';
import { Tag } from '@/pages/index';
import { CircularProgress } from '@mui/material';
import * as React from 'react';
import style from "./ListSound.module.scss";
import ReactAudioPlayer  from "react-audio-player"

export interface IAppProps {
    playlist:Tag,
    
}

export interface filmDetails {
    itune_link: string,
    name: string,
    artist: string
}

export default function ListSound (props: IAppProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    let initState:filmDetails[] = []
    const [filmDetails, setFilmDetails] = React.useState(initState)

    const fetchData = async ()=>{
        const response = await getFilmBySlug(props.playlist.slug);
        if (response.status == 200) {
            setFilmDetails(response.data) 
            setIsLoading(false)
        }
        
    }

    React.useEffect(()=>{
        fetchData()
    },[])

    if (isLoading) {
        return (
        <CircularProgress />
        )
    }

  return (<>
    <div style={{
        width:"100%",
        color:style.textColor
    }}>
        <div style={{
            position: "relative"
        }}>
            <img src={props.playlist.thumbnail} style={{
                width:"100%",
                height:"400px",
                objectFit:"cover",
                filter: "blur(1px)"
            }} />
            <div style={{
                width:"100%",
                height:"400px",
                backgroundColor: "rgba(0,0,0,0.4)",
                position: "absolute",
                top:0,
                left:0
            }} >
            </div>
            <div style={{
                width:"100%",
                height:"400px",
                backgroundColor: "rgba(0,0,0,0.35)",
                position: "absolute",
                top:0,
                left:0,
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            
                }}>
                    <div>
                        <h1>{props.playlist.name}</h1>
                        <div style={{fontSize:"20px", fontStyle:"italic"}}>{`${props.playlist.soundtrack_count} songs`}</div>
                        <div style={{
                            width:"fit-content",
                            padding:"8px 40px 8px 40px",
                            background: "rgba(252, 41, 71, 1)",
                            borderRadius:"20px",
                            marginTop:"24px",
                            cursor:"pointer"
                        }}>
                            Flollow
                        </div>
                    </div>
            </div>
        </div>
        <div style={{
            width:"100%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignContent:"center",
            alignItems:"center"
        }}>
            {
                filmDetails.map((el)=>(
                    <ReactAudioPlayer src={el.itune_link} autoPlay controls/> 
                ))
            }
        </div>
    </div>
  </>
  );
}
