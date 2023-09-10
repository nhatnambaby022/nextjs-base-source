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
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import getSeasons from '@/api/getSeasons';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import getEpisodes from '@/api/getEpisodes';
import getShowDetails from '@/api/getShowDetails';
import Head from 'next/head';
import {useRouter} from "next/router"
export interface IAppProps {
    playlist:Tag,
    
}

export interface audioDetails {
    itune_link: string,
    name: string,
    artist: string,
    amazon_link:string,
    youtube_link:string,
    spotify_link:string,
    apple_link:string
}

interface SoundDetails{
    
}

interface AudioPlayerProps {
    src: string;
    onPlay: (e:HTMLAudioElement | null) => void,
    audio?:audioDetails,
    i:number
}

interface MediaControlProp {
    onNext?: () => void,
    onPrevious?: () => void,
    isPlaying?:boolean,
    setPlaying:() => void,
    time:number,
    audio?:audioDetails,
    setCurrentTime:(time:number | number[])=> void,
    durationTime:number,
    i:number
}

export const MediaControlCard:React.FC<MediaControlProp> = ({isPlaying,setPlaying,time,audio,setCurrentTime,durationTime,i}) => {
    const theme = useTheme();
    const currentTime = time*durationTime
    const mi = Math.floor(currentTime/60)
    const se = Math.floor(currentTime%60)
    const mimax = Math.floor(durationTime/60)
    const semax = Math.floor(durationTime%60)
    return (
      <Card sx={{ display: 'flex',marginTop:"12px", width:"100%", maxWidth:"1200px", backgroundImage:`${isPlaying ? "" :"none"}`}}>
        <Box sx={{display:"flex", alignItems:"center", padding:"10px 0px 10px 10px"}}>
                {i + 1}
        </Box>
        <Box sx={{ display: 'flex', width:"100%" }}>
            <Box sx={{ display: 'flex', width:"100%",flexWrap:"wrap"  }}>
                <CardContent sx={{ flex: '1 0 auto',width:"35%", minWidth:"160px" }}>
                    <Typography component="div" variant="h5">
                    {audio?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    {audio?.artist}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, width:"60%",minWidth: '150px', marginRight:"10px" }} className={style.slider}>
                    <IconButton aria-label="play/pause" onClick={setPlaying} sx={{ height: 38, width: 38, marginRight:"12px" }}>
                        {isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }}/> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
                    </IconButton>
                    <Box sx={{  width: "60%",minWidth: '150px',margin:"8px 8px 0px 10px" }}>
                        {/* <Slider value={time*100} aria-label="Temperature" color="primary" onChange={(e:Event, newvalue:number | number[])=>{setCurrentTime(newvalue); setPlaying}}/> */}
                        <Slider
                                value={time*100}
                                onChange={(e:Event, newvalue:number | number[])=>{setCurrentTime(newvalue); setPlaying}}
                                aria-label="time-indicator"
                                size="small"
                                min={0}
                                step={1}
                                sx={{
                                    color:'rgba(252, 41, 71, 1)',
                                    height: 4,
                                    '& .MuiSlider-thumb': {
                                    width: 15,
                                    height: 15,
                                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                    '&:before': {
                                        boxShadow: '0 2px 12px 0 rgba(0,0,0,1)',
                                    },
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: '0px 0px 0px 8px rgb(255 255 255 / 16%)'
                                    },
                                    '&.Mui-active': {
                                        width: 20,
                                        height: 20,
                                    },
                                    },
                                    '& .MuiSlider-rail': {
                                        opacity: 0.28,
                                    },
                                }}
                                />
                    </Box>
                    <Box style={{marginTop:"3px", minWidth:"12px"}}>{`${mi >= 10 ? mi : `0${mi}`}:${se >= 10 ? se : `0${se}`}`}</Box>
                </Box>
            </Box>
          
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, minWidth:"280px" }} className={style.boxsIcon}>
                <a href={audio?.youtube_link}>
                    <IconButton>
                        <img src="/youtube.png" alt="youtube" className={style.icon_link}/>
                    </IconButton>
                </a>
                <a href={audio?.spotify_link}>
                    <IconButton>
                    <img src="/spotify.png" alt="spotify" className={style.icon_link}/>
                    </IconButton>
                </a>
                <a href={audio?.apple_link}>
                    <IconButton>
                        <img src="/itune.png" alt="itune" className={style.icon_link}/>
                    </IconButton>
                </a>
                <a href={audio?.amazon_link}>
                    <IconButton>
                        <img src="/amazon.png" alt="amazon" className={style.icon_link}/>
                    </IconButton>
                </a>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', width:"24px" }} className={style.dropdownDetails}>
                <IconButton sx={{width:"24px"}} style={{
                    position:"relative"
                }} className={style.dropdownBtn}>
                    <MoreVertIcon className={style.dropdownBtn}/>
                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth:"250px", backgroundColor:"rgba(66, 66, 66, 1)" }} className={style.dropdownLink}>
                        <a href={audio?.youtube_link}>
                            <IconButton>
                                <img src="/youtube.png" alt="youtube" className={style.icon_link}/>
                            </IconButton>
                        </a>
                        <a href={audio?.spotify_link}>
                            <IconButton>
                            <img src="/spotify.png" alt="spotify" className={style.icon_link}/>
                            </IconButton>
                        </a>
                        <a href={audio?.apple_link}>
                            <IconButton>
                                <img src="/itune.png" alt="itune" className={style.icon_link}/>
                            </IconButton>
                        </a>
                        <a href={audio?.amazon_link}>
                            <IconButton>
                                <img src="/amazon.png" alt="amazon" className={style.icon_link}/>
                            </IconButton>
                        </a>
                    </Box>
                </IconButton>
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
const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay,audio,i }) => {


    const [isPlaying, setIsPlaying] = React.useState(false);
    // const [audioRef,setAudioRef] = React.useState<HTMLAudioElement>(null)
    let audioRef = React.createRef<HTMLAudioElement>();
    const [time,setTime] = React.useState(0)
    const [duration,setduration] = React.useState(0)
    
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
        setduration(audioRef.current?.duration ? audioRef.current?.duration : 0)
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
            <div style={{ width:"100%",display:"flex", justifyContent:"center",}}>
                <audio ref={audioRef} src={src} onPause={()=>{setIsPlaying(false)}} onLoadStart={()=>{setIsPlaying(false); setTime(0); }} onTimeUpdate={()=>setTimeInterval()}/>
                <MediaControlCard isPlaying={isPlaying} i={i} setPlaying={togglePlay} time={time} audio={audio} setCurrentTime={setCurrentTime} durationTime={duration}/>
            </div>
        </ThemeProvider>
        
    );
};
export interface season{
    name: string,
    slug: string
}
export interface episode{
    name: string,
    slug: string,
    soundtrack_count:number
}
export default function ListSound (props: IAppProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    let initState:audioDetails[] = []
    const [filmDetails, setFilmDetails] = React.useState(initState)
    const [activePlayer, setActivePlayer] = React.useState<HTMLAudioElement | null>(null)
    const [listAudioElm, setListAudioElm] = React.useState<HTMLAudioElement | null[]>([])
    const [season,setSeason] = React.useState<string>("defaultValue")

    const [seasons,setSeasons] = React.useState<season[]>([])
    const [isLoadingSeasons,setLoadingSeasons] = React.useState(true);

    const [episodes,setEpisodes] = React.useState<episode[]>([])
    const [isLoadingEpisodes,setLoadingEpisodes] = React.useState(true);

    const handlePlay = (playerRef: HTMLAudioElement | null) => {
      activePlayer != playerRef ? activePlayer?.pause() : ()=>{};
      activePlayer != playerRef ? activePlayer?.load() : ()=>{};
      setActivePlayer(playerRef);
    };
    const playlist = props.playlist;
    const fetchData = async ()=>{
        setFilmDetails([])
        setLoadingSeasons(true)
        setLoadingEpisodes(true)
        if (playlist.type == 1){
            const response = await getSeasons(playlist.slug)
            if (response.status == 200){
                setLoadingSeasons(false)
                setSeasons(response.data)
                setIsLoading(false)
            }
        }
        else {
            const response = await getFilmBySlug(props.playlist.slug);
            if (response.status == 200) {
                setFilmDetails(response.data) 
                setIsLoading(false)
            }
        }
        
    }

    let router = useRouter();
    
    
    React.useEffect(()=>{
        let type:string = "shows";
        if (props.playlist.type == 2) {
            type="movies"
        }
        if (props.playlist.slug) router.push(`/${type}/${props.playlist.slug}`)
    },[props.playlist.slug])
    
    React.useEffect(()=>{
        fetchData()
    },[props.playlist.slug])

    if (isLoading) {
        return (
        <CircularProgress />
        )
    }

  return (<>
    <ThemeProvider theme={darkTheme}>
    <Head>
        <title> {playlist.name} | Popcorn Sound</title>
        <meta name="description" content={playlist.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
    </Head>
    <div style={{
        width:"100%",
        color:style.textColor,
        maxWidth:"1200px"
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
                backgroundColor: "rgba(0,0,0,0.7)",
                position: "absolute",
                top:0,
                left:0,
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            
                }}>
                    <div style={{ display:"flex",width:"100%", alignItems:"center",justifyContent:"flex-start"}} className={style.mainContent}>
                        <img src={props.playlist.thumbnail} style={{
                            width:"30%",
                            height:"400px",
                            maxWidth:"250px",
                            objectFit:"cover",
                            borderRadius:"12px"
                        }} className={style.leftPoster}/>

                        <div style={{marginLeft:"12px"}}>
                            <h1>{props.playlist.name}</h1>
                            <div style={{fontSize:"20px", fontStyle:"italic",fontWeight:"900"}}> <span className={style.listDetails}>Movie genre:</span>{playlist.type == 1 ? " Shows" : " Movies"} </div>
                            <div style={{fontSize:"20px", fontStyle:"italic",fontWeight:"900"}}> <span className={style.listDetails}>Number of songs:</span> {`${props.playlist.soundtrack_count} songs`}</div>
                            <div style={{fontSize:"20px",fontWeight:"900"}}> Description</div>
                            <div style={{display:"flex", flexWrap:"wrap"}}>
                            {
                                !playlist 
                                    ? <CircularProgress />
                                    : playlist.type == 2
                                        ?   <div style={{
                                                width:"fit-content",
                                                padding:"8px 40px 8px 40px",
                                                background: "rgba(252, 41, 71, 1)",
                                                borderRadius:"20px",
                                                marginTop:"24px",
                                                cursor:"pointer"
                                            }}>
                                                Flollow
                                            </div>
                                        :   playlist.type == 1 
                                            ?   <div style={{
                                                    paddingRight:"20px",
                                                    width:"fit-content"
                                                }}>
                                                    <Select style={{
                                                        height:"40px",
                                                        border:"0px", 
                                                        width:"fit-content",
                                                        minWidth:"150px",
                                                        backgroundColor:"rgba(252, 41, 71, 1)",
                                                        color:style.textColor,
                                                        fontSize:"18px",
                                                        background: "rgba(252, 41, 71, 1)",
                                                        borderRadius:"20px",
                                                        marginTop:"24px",
                                                    }}
                                                    defaultValue="defaultValue"
                                                    onChange={async (e)=>{
                                                        activePlayer?.pause()
                                                        if (e.target.value != "defaultValue"){
                                                            const response = await getEpisodes(playlist.slug,e.target.value)
                                                            if (response.status == 200){
                                                                setLoadingEpisodes(false)
                                                                setEpisodes(response.data)
                                                                setSeason(e.target.value)
                                                            } else {
                                                                setLoadingEpisodes(true)
                                                            }
                                                        } else {
                                                            setLoadingEpisodes(true)
                                                            setFilmDetails([])
                                                        }
                                                    }}
                                                    >   
                                                        <MenuItem value={`defaultValue`}>Select Season</MenuItem>
                                                        {seasons.map((el,index)=>(
                                                            <MenuItem value={el.slug}>{el.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            : <></>
                            }
                            {
                                !isLoadingEpisodes && season != 'defaultValue'
                                    ?   <div style={{
                                            paddingRight:"20px",
                                            width:"fit-content"
                                        }}>
                                            <Select style={{
                                                height:"40px",
                                                border:"0px", 
                                                width:"fit-content",
                                                minWidth:"150px",
                                                backgroundColor:"rgba(122, 122, 122, 1)",
                                                color:style.textColor,
                                                fontSize:"18px",
                                                borderRadius:"20px",
                                                marginTop:"24px",
                                                maxWidth:"210px"
                                            }}
                                            defaultValue="defaultValue"
                                            onChange={async (e)=>{
                                                activePlayer?.pause()
                                                if (e.target.value != "defaultValue"){
                                                    const response = await getShowDetails(playlist.slug,e.target.value);
                                                    if (response.status == 200) {
                                                        setFilmDetails([])
                                                        setFilmDetails(response.data) 
                                                        setIsLoading(false)
                                                    }
                                                } else {
                                                    setFilmDetails([])
                                                }
                                            }}
                                            >   
                                                <MenuItem value={`defaultValue`}>Select Episode</MenuItem>
                                                {episodes.map((el,index)=>(
                                                    <MenuItem value={el.slug}>{`(${el.soundtrack_count}) `}{el.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    :   <></>
                            }
                            </div>
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
                filmDetails.length > 0 
                ? filmDetails.map((el,index)=>{
                    const i = index
                    return <>
                        <AudioPlayer
                            i={i}
                            src={el.itune_link}
                            audio={el}
                            onPlay={handlePlay}
                        /> 
                    </>
                })
                : <></>
            }
        </div>
        
    </div>
    {/* <div style={{
        backgroundColor:"rgba(0, 0, 0, 1)",
        height:"93px", 
        width:"100vw", 
        bottom:0, 
        position:"fixed",
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center"
    }}>
        <div style={{
            width:"98%",
            maxWidth:"1200px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <ThemeProvider theme={darkTheme}>
                <div>
                    <IconButton>
                       <ShuffleOnIcon />
                    </IconButton>
                    <IconButton>
                        <SkipPreviousIcon fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <PlayArrowIcon fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <SkipNextIcon fontSize="large"/>
                    </IconButton>
                    <IconButton>
                       <RepeatOnIcon />
                    </IconButton>
                </div>
                <Slider value={10} aria-label="Temperature" color="secondary" style={{paddingTop:"0px"}}/>
            </ThemeProvider>
        </div>
    </div> */}
    </ThemeProvider>
  </>
  );
}
