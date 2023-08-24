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

interface SoundDetails{
    
}

interface AudioPlayerProps {
    src: string;
    onPlay: (e:HTMLAudioElement | null) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.createRef<HTMLAudioElement>();
    
    const togglePlay = () => {
        if (isPlaying) {
        audioRef.current!.pause();
        } else {
        onPlay(audioRef.current);
        audioRef.current!.play();
        }
        setIsPlaying(!isPlaying);
    };
    
    return (
        <div>
        <audio ref={audioRef} src={src} onPause={()=>{setIsPlaying(false)}}/>
        <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
        </button>
        </div>
    );
};

export default function ListSound (props: IAppProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    let initState:filmDetails[] = []
    const [filmDetails, setFilmDetails] = React.useState(initState)
    const [activePlayer, setActivePlayer] = React.useState<HTMLAudioElement | null>(null)
  
    const handlePlay = (playerRef: HTMLAudioElement | null) => {
      activePlayer ? activePlayer.pause() : ()=>{};
      setActivePlayer(playerRef);
    };
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
                filmDetails.map((el,index)=>(
                    <AudioPlayer
                        key={index}
                        src={el.itune_link}
                        onPlay={handlePlay}
                    /> 
                ))
            }
        </div>
    </div>
  </>
  );
}
