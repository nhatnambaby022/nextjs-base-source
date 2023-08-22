import { Tag } from '@/pages/index';
import { Pagination } from '@mui/material';
import * as React from 'react';
import style from "./BoxList.module.scss"
import { ThemeProvider, createTheme } from '@mui/material/styles';
export interface IAppProps {
    ListItems: Tag[]
}

const Item: React.FC<{tag:Tag}> = ({tag}) =>{
    return (<>
        <div style={{
            margin:"0px 10px 10px 0px",
            height:300,
            display:"flex",
            flexDirection:"column"
        }}>
            <img src={`/tmp/${tag.image}`} alt="" style={{
                width:200,
                height:200,
                objectFit:"cover"
            }}/>
            <div style={{
                background:"rgba(33, 33, 33, 1)",
                height:100
            }}>
                <h4 style={{
                    fontSize:"16px",
                    fontWeight:"bold",
                    width:200,
                    padding:"10px 0px 0px 10px"
                }}>
                    {tag.title}
                </h4>
            </div>
        </div>
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
    const ListFile = props.ListItems
    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{
                marginTop:"14px",
                color:style.textColor,
            }}>
                <span>List movie</span>
                <div style={{
                    width:"calc(100vw - 48px)",
                    maxWidth:"1260px",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <div style={{
                        display:"flex",
                        flexWrap:"wrap"
                    }}>
                        {
                            ListFile.map((item)=>
                                <Item tag={item}/>
                            )
                        }
                    </div>
                    <Pagination count={20} color="secondary" style={{color:"white !important"}}/>
                </div>
            </div>
            
        </ThemeProvider>
    )
}
