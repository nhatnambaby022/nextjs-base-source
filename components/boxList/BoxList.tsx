import { Tag } from '@/pages/index';
import { CircularProgress, Pagination } from '@mui/material';
import * as React from 'react';
import style from "./BoxList.module.scss"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getListFilm from '@/api/getListFilm';
import Link from "next/link";
import getListShows from '@/api/getListShows';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
export interface IAppProps {
    ListItems: Tag[],
    type:string
}

const Item: React.FC<{tag:Tag}> = ({tag}) =>{
    return (<>
    <Link href={`/sound/${tag.slug}`}>
        <div style={{
            margin:"0px 20px 20px 0px",
            display:"flex",
            flexDirection:"column",
        }}>
            <img src={tag.thumbnail} alt="" className={style.tagMobile} style={{
                height:200,
                objectFit:"cover",
            }}/>
            <div className={style.tagMobile} style={{
                background:"rgba(33, 33, 33, 1)",
                display:"flex",
                justifyContent:"center",
                height:60
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
                    <br/> 
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
      const response = await callGetListAPI();
      if (response.status == 200) {
        setListFilm(response.data)
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

    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{
                marginTop:"24px",
                color:style.textColor,
            }}>
                <span>List {props.type}</span>
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
                    <Pagination count={listFilm.last_page} page={page}  color="secondary" style={{color:"white !important"}} onChange={handleChange}/>
                </div>
            </div>
            
        </ThemeProvider>
    )
}
