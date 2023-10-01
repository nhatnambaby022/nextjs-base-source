import getFilmBySlug from '@/api/getFilmBySlug'
import { Tag } from '@/pages/index'
import { CircularProgress } from '@mui/material'
import * as React from 'react'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import style from './ListSound.module.scss'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import PauseIcon from '@mui/icons-material/Pause'
import LinearProgress from '@mui/material/LinearProgress'
import Slider from '@mui/material/Slider'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import RepeatIcon from '@mui/icons-material/Repeat'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import RepeatOnIcon from '@mui/icons-material/RepeatOn'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import getSeasons from '@/api/getSeasons'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import getEpisodes from '@/api/getEpisodes'
import getShowDetails from '@/api/getShowDetails'
import Head from 'next/head'
import { useRouter } from 'next/router'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import getMovie from '@/api/themoviedb_api/getMovie'

export interface IAppProps {
  playlist: Tag
}

export interface ICountrie {
  name: string
}

export interface IGenre {
  id: string
  name: string
}

export interface ITheMovDB {
  backdrop_path: string
  poster_path: string
  genres: IGenre[]
  production_countries: ICountrie[]
  release_date: string
}

export interface audioDetails {
  itune_link: string
  name: string
  artist: string
  amazon_link: string
  youtube_link: string
  spotify_link: string
  apple_link: string
}
import YouTube, { YouTubeProps } from 'react-youtube';

interface youtubeParams{
    isShow: boolean,
    id_video: string,
    setOpenYT:Function
}
function YoutubeIfram({isShow,id_video,setOpenYT}:youtubeParams){
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  if (!isShow){
    return <></>
  }
  return <div  style={{
        bottom:10,
        right:10,
        position:"fixed",
        display:"flex", 
        justifyContent:"center", 
        alignItems:"flex-start",
        zIndex:1000,
        flexDirection:"column",
        marginLeft:"10px"
    }}>
        <IconButton style={{
            margin:"0px 0px -20px -20px"
        }}
            onClick={()=>{
                setOpenYT(false)
            }}
        >
            <DisabledByDefaultIcon color="primary"></DisabledByDefaultIcon>
        </IconButton>
        <YouTube videoId={id_video} opts={opts}  onReady={onPlayerReady} style={{
            height:"40vh",
            maxHeight:"500px",
            width:"calc(100vw - 20px)",
            maxWidth:"640px"
        }}/>
    </div>;
}

interface SoundDetails {}

interface AudioPlayerProps {
  src: string
  onPlay: (e: HTMLAudioElement | null) => void
  audio?: audioDetails
  i: number,
  setOpenYT:Function,
    setIdYT:Function
}

interface MediaControlProp {
  onNext?: () => void
  onPrevious?: () => void
  isPlaying?: boolean
  setPlaying: () => void
  time: number
  audio?: audioDetails
  setCurrentTime: (time: number | number[]) => void
  durationTime: number
  i: number,
  disabled:boolean,
    setOpenYT:Function,
    setIdYT:Function
}

export const MediaControlCard: React.FC<MediaControlProp> = ({
  isPlaying,
  setPlaying,
  time,
  audio,
  setCurrentTime,
  durationTime,
  i,disabled
  ,setOpenYT,setIdYT
}) => {
  const theme = useTheme()
  const currentTime = time * durationTime
  const mi = Math.floor(currentTime / 60)
  const se = Math.floor(currentTime % 60)
  const mimax = Math.floor(durationTime / 60)
  const semax = Math.floor(durationTime % 60)
  const [idYTTmp,setIdYTTmp] = React.useState<string | null>(null)
  React.useEffect(()=>{
      const ytLink = audio?.youtube_link ? audio?.youtube_link : ""
      // const ytLink = "https://www.youtube.com/watch?v=tiLi9OqxuGQ"
      const urlYT = new URL(ytLink)
      setIdYTTmp(urlYT.searchParams.get("v"))
  },[audio])
  return (
    <Card
      sx={{
        display: 'flex',
        marginTop: '12px',
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: '#161616',
        backgroundImage: `${isPlaying ? '' : 'none'}`
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 0px 10px 20px'
        }}
      >
        {i + 1}
      </Box>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            padding: '20px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              height: 48,
              width: 48,
              borderRadius: '50%',
              backgroundColor: '#393939' // Màu xám
            }}
          ></div>
          <CircularProgress
            variant="determinate"
            value={time * 100}
            size={120}
            thickness={4}
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              height: 48,
              width: 48,
              color: '#FC2947'
            }}
          />
          <IconButton
            aria-label="play/pause"
            onClick={setPlaying}
            sx={{ height: 38, width: 38, marginRight: '12px' }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              flex: '1 0 auto',
              width: '35%',
              minWidth: '160px'
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{ fontSize: '1.1rem' }}
            >
              {audio?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {audio?.artist}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 1,
            minWidth: '280px'
          }}
          className={style.boxsIcon}
        >
          <a href={audio?.youtube_link} target="_blank">
            <IconButton>
              <img
                src="/youtube.png"
                alt="youtube"
                className={style.icon_link}
              />
            </IconButton>
          </a>
          <a href={audio?.spotify_link} target="_blank">
            <IconButton>
              <img
                src="/spotify.png"
                alt="spotify"
                className={style.icon_link}
              />
            </IconButton>
          </a>
          <a href={audio?.apple_link} target="_blank">
            <IconButton>
              <img src="/itune.png" alt="itune" className={style.icon_link} />
            </IconButton>
          </a>
          <a href={audio?.amazon_link} target="_blank">
            <IconButton>
              <img src="/amazon.png" alt="amazon" className={style.icon_link} />
            </IconButton>
          </a>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', width: '24px' }}
          className={style.dropdownDetails}
        >
          <IconButton
            sx={{ width: '24px' }}
            style={{
              position: 'relative'
            }}
            className={style.dropdownBtn}
          >
            <MoreVertIcon className={style.dropdownBtn} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '250px',
                backgroundColor: 'rgba(66, 66, 66, 1)'
              }}
              className={style.dropdownLink}
            >
              {idYTTmp ? 
                        <IconButton onClick={()=>{
                            setIdYT(idYTTmp)
                            setOpenYT(true)
                        }}>
                            <img src="/youtube.png" alt="youtube" className={style.icon_link}/>
                        </IconButton> 
                        :
                        <a href={audio?.youtube_link} target="_blank">
                            <IconButton>
                                <img src="/youtube.png" alt="youtube" className={style.icon_link}/>
                            </IconButton>
                        </a>}
              <a href={audio?.spotify_link} target="_blank">
                <IconButton>
                  <img
                    src="/spotify.png"
                    alt="spotify"
                    className={style.icon_link}
                  />
                </IconButton>
              </a>
              <a href={audio?.apple_link} target="_blank">
                <IconButton>
                  <img
                    src="/itune.png"
                    alt="itune"
                    className={style.icon_link}
                  />
                </IconButton>
              </a>
              <a href={audio?.amazon_link} target="_blank">
                <IconButton>
                  <img
                    src="/amazon.png"
                    alt="amazon"
                    className={style.icon_link}
                  />
                </IconButton>
              </a>
            </Box>
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
})
const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay, audio, i ,setOpenYT, setIdYT}) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  // const [audioRef,setAudioRef] = React.useState<HTMLAudioElement>(null)
  let audioRef = React.createRef<HTMLAudioElement>()
  const [time, setTime] = React.useState(0)
  const [duration, setduration] = React.useState(0)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current!.pause()
    } else {
      onPlay(audioRef.current)
      audioRef.current!.play()
    }
    setIsPlaying(!isPlaying)
  }
  function setCurrentTime(time: number | number[]) {
    if (typeof time == 'number') {
      const totalTime = audioRef.current?.duration
        ? audioRef.current?.duration
        : 1
      if (audioRef.current) {
        audioRef.current.currentTime = (time / 100) * totalTime
      }
      setTime(time / 100)
      onPlay(audioRef.current)
      audioRef.current!.play()
      setIsPlaying(true)
    }
  }

  function setTimeInterval() {
    setduration(audioRef.current?.duration ? audioRef.current?.duration : 0)
    const currentTime = audioRef.current?.currentTime
      ? audioRef.current?.currentTime
      : 0
    const totalTime = audioRef.current?.duration
      ? audioRef.current?.duration
      : 1
    if (currentTime / totalTime == 1) {
      setTime(0)
    } else {
      setTime(currentTime / totalTime)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <audio
          ref={audioRef}
          src={src}
          onPause={() => {
            setIsPlaying(false)
          }}
          onLoadStart={() => {
            setIsPlaying(false)
            setTime(0)
          }}
          onTimeUpdate={() => setTimeInterval()}
        />
        <MediaControlCard
        setIdYT={setIdYT} setOpenYT={setOpenYT}
          isPlaying={isPlaying}
          i={i}
          setPlaying={togglePlay}
          time={time}
          audio={audio}
          setCurrentTime={setCurrentTime}
          durationTime={duration}
          disabled={src ? false : true}
        />
      </div>
    </ThemeProvider>
  )
}
export interface season {
  name: string
  slug: string
}
export interface episode {
  name: string
  slug: string
  soundtrack_count: number
}
export default function ListSound(props: IAppProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  let initState: audioDetails[] = []
  const [filmDetails, setFilmDetails] = React.useState(initState)
  const [thMovDBData, setThMovDBData] = React.useState<ITheMovDB>()
  const [activePlayer, setActivePlayer] =
    React.useState<HTMLAudioElement | null>(null)
  const [listAudioElm, setListAudioElm] = React.useState<
    HTMLAudioElement | null[]
  >([])
  const [season, setSeason] = React.useState<string>()
  const [openYoutube,setOpenYoutube] = React.useState<boolean>(false)
  const [idYoutube,setIdYoutube] = React.useState<string>("")

  const [seasons, setSeasons] = React.useState<season[]>([])
  const [isLoadingSeasons, setLoadingSeasons] = React.useState(true)

  const [episodes, setEpisodes] = React.useState<episode[]>([])
  const [isLoadingEpisodes, setLoadingEpisodes] = React.useState(true)

  const handlePlay = (playerRef: HTMLAudioElement | null) => {
    activePlayer != playerRef ? activePlayer?.pause() : () => {}
    activePlayer != playerRef ? activePlayer?.load() : () => {}
    setActivePlayer(playerRef)
  }
  const playlist = props.playlist
  const fetchData = async () => {
    try {
      setFilmDetails([])
    setLoadingSeasons(true)
    setLoadingEpisodes(true)
    if (playlist.type == 1) {
      const response = await getSeasons(playlist.slug)
      if (response.status == 200) {
        setLoadingSeasons(false)
        setSeasons(response.data)
        setIsLoading(false)
        const season = response.data[0].slug
                setSeason(response.data[0].slug)
                if (season){
                    const episodeRes = await getEpisodes(playlist.slug,season)
                    if (episodeRes.status == 200){
                        setEpisodes(episodeRes.data)
                        setLoadingEpisodes(false)
                        const episode = episodeRes.data[0].slug
                        if (episode) {
                            const showDetailsRes = await getShowDetails(playlist.slug,episode)
                            if (showDetailsRes.status == 200){
                                setFilmDetails(showDetailsRes.data)
                                setIsLoading(false)
                            } else {
                                setFilmDetails([])
                                setIsLoading(false)
                                
                            }
                        }
                    }
                    
                }
        const thMovDBRes = await getMovie(props.playlist.themoivedb_id)
        if (thMovDBRes.status == 200) {
          console.log(thMovDBRes.data)
          setThMovDBData(thMovDBRes.data)
        }
      }
    } else {
      const response = await getFilmBySlug(props.playlist.slug)
      const thMovDBRes = await getMovie(props.playlist.themoivedb_id)
      if (response.status == 200) {
        setFilmDetails(response.data)
        setIsLoading(false)
        if (thMovDBRes.status == 200) {
          console.log(thMovDBRes.data)
          setThMovDBData(thMovDBRes.data)
        }
      }
    }
    } catch (error) {
      console.log(error)
    }
  }

  let router = useRouter()

  React.useEffect(() => {
    let type: string = 'shows'
    if (props.playlist.type == 2) {
      type = 'movies'
    }
    if (props.playlist.slug) router.push(`/${type}/${props.playlist.slug}`)
  }, [props.playlist.slug])

  React.useEffect(() => {
    fetchData()
  }, [props.playlist.slug])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            width: '100%',
            color: style.textColor
          }}
        >
          <div
            style={{
              position: 'relative'
            }}
          >
            <img
              src={
                isNotNull(thMovDBData?.backdrop_path)
                  ? `https://image.tmdb.org/t/p/original${
                      thMovDBData!.backdrop_path
                    }`
                  : props.playlist.backdrop
              }
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover'
              }}
            />
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            ></div>
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{ maxWidth: '1100px' }}>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}
                  className={style.mainContent}
                >
                  <img
                    src={
                      isNotNull(thMovDBData?.poster_path)
                        ? `https://image.tmdb.org/t/p/original${
                            thMovDBData!.poster_path
                          }`
                        : props.playlist.thumbnail
                    }
                    style={{
                      width: '30%',
                      height: '400px',
                      maxWidth: '250px',
                      objectFit: 'cover'
                    }}
                    className={style.leftPoster}
                  />
                  <div style={{ marginLeft: '12px' }}>
                    <h1>{props.playlist.name}</h1>
                    {isNotNull(thMovDBData?.genres) && (
                      <div style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                        {' '}
                        <span className={style.listDetails}>Genre:</span>
                        {thMovDBData!.genres.map((e) => ` ${e.name!},`)}{' '}
                      </div>
                    )}
                    {isNotNull(thMovDBData?.production_countries) && (
                      <div style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                        {' '}
                        {thMovDBData!.production_countries.length > 0 && (
                          <span className={style.listDetails}>Countrie:</span>
                        )}
                        {thMovDBData!.production_countries.map(
                          (e) => ` ${e.name!},`
                        )}
                      </div>
                    )}
                    <div className={style.textDes}>{playlist.description}</div>
                    <div style={{ display: 'flex' }}>
                      {isNotNull(thMovDBData?.release_date) && (
                        <span
                          style={{
                            display: 'flex',
                            fontSize: '0.85rem',
                            fontStyle: 'italic',
                            marginTop: '10px',
                            marginRight: '10px',
                            alignItems: 'center',
                            color: 'rgba(255, 255, 255, 0.7)'
                          }}
                        >
                          <CalendarMonthIcon
                            style={{
                              marginRight: '6px',
                              width: '30px',
                              height: '30px'
                            }}
                          />
                          {thMovDBData!.release_date}
                        </span>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          fontSize: '0.85rem',
                          fontStyle: 'italic',
                          marginTop: '10px',
                          alignItems: 'center',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        <HeadphonesIcon
                          style={{
                            width: '30px',
                            height: '30px',
                            marginRight: '6px'
                          }}
                        />
                        <span>{`${props.playlist.soundtrack_count} songs`}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {!playlist ? (
                        <CircularProgress />
                      ) : playlist.type == 2 ? (
                        <div
                          style={{
                            width: 'fit-content',
                            padding: '8px 40px 8px 40px',
                            background: 'rgba(252, 41, 71, 1)',
                            borderRadius: '20px',
                            marginTop: '16px',
                            cursor: 'pointer'
                          }}
                        >
                          Flollow
                        </div>
                      ) : playlist.type == 1 ? (
                        <div
                          style={{
                            paddingRight: '20px',
                            width: 'fit-content'
                          }}
                        >
                          <Select
                            style={{
                              height: '40px',
                              border: '0px',
                              width: 'fit-content',
                              minWidth: '150px',
                              backgroundColor: 'rgba(252, 41, 71, 1)',
                              color: style.textColor,
                              fontSize: '18px',
                              background: 'rgba(252, 41, 71, 1)',
                              borderRadius: '20px',
                              marginTop: '24px'
                            }}
                            value={season}
                            onChange={async (e) => {
                              activePlayer?.pause()
                              if (e.target.value != 'defaultValue') {
                                const response = await getEpisodes(
                                  playlist.slug,
                                  e.target.value
                                )
                                if (response.status == 200) {
                                  setLoadingEpisodes(false)
                                  setEpisodes(response.data)
                                  setSeason(e.target.value)
                                } else {
                                  setLoadingEpisodes(true)
                                }
                              } else {
                                setSeason("defaultValue")
                                setLoadingEpisodes(true)
                                setFilmDetails([])
                              }
                            }}
                          >
                            <MenuItem value={`defaultValue`}>
                              Select Season
                            </MenuItem>
                            {seasons.map((el, index) => (
                              <MenuItem value={el.slug}>{el.name}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      ) : (
                        <></>
                      )}
                      {!isLoadingEpisodes && season != 'defaultValue' ? (
                        <div
                          style={{
                            paddingRight: '20px',
                            width: 'fit-content'
                          }}
                        >
                          <Select
                            style={{
                              height: '40px',
                              border: '0px',
                              width: 'fit-content',
                              minWidth: '150px',
                              backgroundColor: 'rgba(122, 122, 122, 1)',
                              color: style.textColor,
                              fontSize: '18px',
                              borderRadius: '20px',
                              marginTop: '24px',
                              maxWidth: '210px'
                            }}
                            defaultValue={episodes[0] ? episodes[0].slug : "defaultValue"}
                            onChange={async (e) => {
                              activePlayer?.pause()
                              if (e.target.value != 'defaultValue') {
                                const response = await getShowDetails(
                                  playlist.slug,
                                  e.target.value
                                )
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
                            <MenuItem value={`defaultValue`}>
                              Select Episode
                            </MenuItem>
                            {episodes.map((el, index) => (
                              <MenuItem value={el.slug}>
                                {`(${el.soundtrack_count}) `}
                                {el.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              maxWidth: '1100px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px 20px',
                marginTop: "10px",
                width: '100%',
                borderTop: "1px solid #212121",
                borderBottom: "1px solid #212121"
              }}
            >
              <div>
                <span>#</span>
                <span style={{marginLeft: "90px"}}>Name</span>
              </div>
              <div>
                <span>Listen on</span>
              </div>
            </div>
            {filmDetails.length > 0 ? (
              filmDetails.map((el, index) => {
                const i = index
                return (
                  <>
                    <AudioPlayer
                      i={i}
                      src={el.itune_link}
                      audio={el}
                      onPlay={handlePlay}
                      setOpenYT={setOpenYoutube}
                      setIdYT={setIdYoutube}
                    />
                  </>
                )
              })
            ) : (
              <></>
            )}
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
    <YoutubeIfram id_video={idYoutube} isShow={openYoutube} setOpenYT={setOpenYoutube}/>
      </ThemeProvider>
    </>
  )
}

function isNotNull(input: any): boolean {
  if (input == undefined) {
    return false
  } else if (input == null) {
    return false
  } else if (input.length != undefined) {
    if (input.length != 0) {
      return true
    } else return false
  } else {
    return true
  }
}
