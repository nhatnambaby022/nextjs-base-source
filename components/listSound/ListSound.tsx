import getFilmBySlug from '@/api/getFilmBySlug';
import { Tag } from '@/pages/index';
import { CircularProgress } from '@mui/material';
import * as React from 'react';
import style from "./ListSound.module.scss";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause'
import LinearProgress from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
export interface IAppProps {
    playlist:Tag,
    
}

export interface audioDetails {
    itune_link: string,
    name: string,
    artist: string
}

interface SoundDetails{
    
}

interface AudioPlayerProps {
    src: string;
    onPlay: (e:HTMLAudioElement | null) => void,
    audio?:audioDetails
}

interface MediaControlProp {
    onNext?: () => void,
    onPrevious?: () => void,
    isPlaying?:boolean,
    setPlaying:() => void,
    time:number,
    audio?:audioDetails,
    setCurrentTime:(time:number | number[])=> void
}

export const MediaControlCard:React.FC<MediaControlProp> = ({isPlaying,setPlaying,time,audio,setCurrentTime}) => {
    const theme = useTheme();
  
    return (
      <Card sx={{ display: 'flex',marginTop:"12px", width:"100%", maxWidth:"1200px"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width:"100%" }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {audio?.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            {audio?.artist}
            </Typography>
          </CardContent>
          <Box style={{width:"100%",display: 'flex',flexWrap:"wrap", justifyContent:"space-between"}}>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, width:"60%" }}>
                <IconButton aria-label="play/pause" onClick={setPlaying}>
                    {isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }}/> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
                </IconButton>
                <Box sx={{ minWidth: '250px', width: "100%",margin:"8px 8px 0px 0px" }}>
                    <Slider value={time*100} aria-label="Temperature" color="secondary" onChange={(e:Event, newvalue:number | number[])=>{setCurrentTime(newvalue); setPlaying}}/>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton>
                    <img src="/youtube.png" alt="youtube" style={{width:"54px"}}/>
                </IconButton>
                <IconButton>
                <img src="/spotify.png" alt="spotify" />
                </IconButton>
                <IconButton>
                    <img src="/itune.png" alt="itune" />
                </IconButton>
                <IconButton>
                    <img src="/apple.png" alt="apple"/>
                </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    );
}
const darkTheme = createTheme ({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay,audio }) => {


    const [isPlaying, setIsPlaying] = React.useState(false);
    let audioRef = React.createRef<HTMLAudioElement>();
    const [time,setTime] = React.useState(0)
    
    const togglePlay = () => {
        if (isPlaying) {
        audioRef.current!.pause();
        } else {
        onPlay(audioRef.current);
        audioRef.current!.play();
        }
        setIsPlaying(!isPlaying);
    };
    
    function setCurrentTime(time:number | number[]) {
        if (typeof time == "number") {
            const totalTime = audioRef.current?.duration ? audioRef.current?.duration : 1
            if (audioRef.current){
                audioRef.current.currentTime = (time/100)*totalTime
            }
            setTime(time/100);
            onPlay(audioRef.current);
            audioRef.current!.play();
            setIsPlaying(true);
        }
        
    }

    function setTimeInterval(){
        const currentTime = audioRef.current?.currentTime ? audioRef.current?.currentTime : 0
        const totalTime = audioRef.current?.duration ? audioRef.current?.duration : 1
        if  (currentTime/totalTime == 1){
            setTime(0)
        } else {
            setTime(currentTime/totalTime) 
        }
        
    }
    
    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{ width:"100%",display:"flex", justifyContent:"center"}}>
                <audio ref={audioRef} src={src} onPause={()=>{setIsPlaying(false)}} onLoadStart={()=>{setIsPlaying(false); setTime(0)}} onTimeUpdate={()=>setTimeInterval()}/>
                <MediaControlCard isPlaying={isPlaying} setPlaying={togglePlay} time={time} audio={audio} setCurrentTime={setCurrentTime}/>
            </div>
        </ThemeProvider>
        
    );
};

export default function ListSound (props: IAppProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    let initState:audioDetails[] = []
    const [filmDetails, setFilmDetails] = React.useState(initState)
    const [activePlayer, setActivePlayer] = React.useState<HTMLAudioElement | null>(null)
    const [listAudioElm, setListAudioElm] = React.useState<HTMLAudioElement | null[]>([])
    const handlePlay = (playerRef: HTMLAudioElement | null) => {
      activePlayer != playerRef ? activePlayer?.pause() : ()=>{};
      activePlayer != playerRef ? activePlayer?.load() : ()=>{};
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
                    <div style={{margin:"12px"}}>
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
                        audio={el}
                        onPlay={handlePlay}
                    /> 
                ))
            }
        </div>
    </div>
  </>
  );
}
