import { Tag } from '@/pages/index';
import { CircularProgress, Pagination } from '@mui/material';
import * as React from 'react';
import style from "./BoxList.module.scss"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getListFilm from '@/api/getListFilm';
import Link from "next/link";
import getListShows from '@/api/getListShows';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Grid from '@mui/material/Grid';
import searchFilm from '@/api/searchFilm';
export interface IAppProps {
    ListItems: Tag[],
    type:string,
    title:string,
    hiddenPaging?:boolean,
    keySearch?:string
}

const Item: React.FC<{tag:Tag}> = ({tag}) =>{
    return (<>
    <Link href={`/sound/${tag.slug}`}>
        <div className={style.layOutTag} style={{
            display:"flex",
            flexDirection:"column",
            width: "30%"
        }}>
            <img src={tag.thumbnail} alt="" className={style.tagMobile} style={{
                height: 200,
                objectFit:"cover",
            }}/>
            <div className={style.tagMobile} style={{
                background:"rgba(33, 33, 33, 1)",
                display:"flex",
                justifyContent:"center",
                height:80
            }}>
                <span className={style.tagMobile} style={{
                    fontSize:"16px",
                    fontWeight:"bold",
                    padding:"10px",
                    overflow:"hidden",
                    textOverflow:"ellipsis",
                    whiteSpace:"nowrap"
                }}>
                    {tag.name}
                    <div style={{height: 10}}></div>
                    <div style={{
                        display:"flex",
                        alignItems:"center",
                        minHeight:"24px",
                        color:"rgba(255, 255, 255, 0.7)",
                        fontStyle:"italic"
                    }}><MusicNoteIcon/><span>{tag.soundtrack_count} songs</span> </div>
                </span>
            </div>
        </div>
    </Link>
    </>)
}
const darkTheme = createTheme ({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
export default function BoxList (props: IAppProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [listFilm, setListFilm] = React.useState({
        data: [],
        last_page:0
    });
    let callGetListAPI = getListShows
    if (props.type == "movies") {
        callGetListAPI = getListFilm
    }
    const [page, setPage] = React.useState(1);

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true)
        setPage(value);
        const response = await callGetListAPI(value);
        if (response.status == 200) {
            setListFilm(response.data)
            setIsLoading(false)
        }
    };

    const fetchData = async ()=>{
      if (props.type=="all" && props.keySearch){
        const response = await searchFilm(props.keySearch);
        if (response.status == 200) {
            setListFilm({data:response.data, last_page:0})
            setIsLoading(false)
        }
      } else {
        const response = await callGetListAPI();
        if (response.status == 200) {
            setListFilm(response.data)
            setIsLoading(false)
        }
      }
    }

    React.useEffect(()=>{
      fetchData()
    },[props.keySearch])

    if (isLoading) {
      return (
        <CircularProgress />
      )
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{
                margin:"20px",
                color:style.textColor,
            }}>
                <hr style={{marginBottom: "20px", borderColor : "#525252"}}/>
                <span>{props.title} {props.type == "all" ? ` for "${props.keySearch}"` : ""}</span>
                <hr style={{margin: "20px 0px", borderColor : "#525252"}}/>
                <div style={{
                    width:"fit-content",
                    maxWidth:"1260px",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:"24px",
                }}>
                    <div style={{
                        width: "100%",
                        display:"flex",
                        flexWrap:"wrap",
                        justifyContent:"center"
                    }}>
                        {
                            listFilm.data.map((item)=>
                                     <Item tag={item}/>
                            )
                        }
                    </div>
                    {props.hiddenPaging ? <></> : <Pagination count={listFilm.last_page} page={page}  color="secondary" style={{color:"white !important", marginTop: "10px"}} onChange={handleChange}/>}
                </div>
            </div>
        </ThemeProvider>
    )
}
