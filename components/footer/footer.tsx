import { Button } from '@mui/base';
import { height, minHeight } from '@mui/system';
import Link from 'next/link';
import * as React from 'react';
import style from './footer.module.scss';

export interface IAppProps {
}

export default function Footer (props: IAppProps) {
  return (
    <div className={style.footer} style={{
        display:"flex",
        width:"100vw",
        backgroundColor:"rgba(33, 33, 33, 1)",
        minHeight:"180px",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        left:0,
        bottom:-180
        
    }}>
        <div style={{
            display:"flex",
            width:"100vw",
            maxWidth:"1200px",
            justifyItems:"center",
            alignItems:"center",
            flexWrap:"wrap",
            color:style.textColor,
        }}>
            <div  className={style.boxItem} style={{
            }}>
                <img src='/logo_and_text.svg' style={{
                    marginRight:"12px"
                }}/>
                <div style={{
                    maxWidth:"256px"
                }}>Discover Cinematic Soundscapes: Your Premier Destination for Audio Excellence in Film. <br/>
                    <span style={{
                        fontSize:"16px",
                        fontStyle:"italic",
                        color:"rgba(177, 177, 177, 1)"
                    }} >2023 copyright by Popcorn Sound</span><br/>
                    <span style={{
                        fontSize:"16px",
                        fontStyle:"italic",
                        color:"rgba(177, 177, 177, 1)"
                    }}><Link style={{textDecoration:"underline 2px"}} href="/privacy">Privacy</Link> or <Link style={{textDecoration:"underline 2px"}} href="/terms">Terms</Link></span>
                     
                </div>
            </div>
            <div className={style.boxItem} style={{

            }} >
                <div>
                    <div style={{fontSize:"20px"}}>You can download our app</div>
                    <div style={{
                        display:"flex",
                        marginTop:"12px"
                    }}>
                        <Button style={{backgroundColor:"rgba(33, 33, 33, 1)",marginRight:"6px"}}><img src='/chplay.png'/></Button>
                        <Button style={{backgroundColor:"rgba(33, 33, 33, 1)"}}><img src='/apple_store.png'/></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
