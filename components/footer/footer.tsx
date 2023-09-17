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
                    }}>
                        <Link style={{textDecoration:"underline 2px"}} href="/privacy">Privacy</Link>
                        <span>, </span>
                        <Link style={{textDecoration:"underline 2px"}} href="/terms">Terms</Link>
                        <span> or </span>
                        <Link style={{textDecoration:"underline 2px"}} href="/contact">Contact Us</Link>
                    </span>
                     
                </div>
            </div>
            <div className={style.boxItem} style={{

            }} >
                <div>
                    <div>You can download our app</div>
                    <div style={{
                        display:"flex",
                    }}> 
                        <Link href="https://play.google.com/store/apps/details?id=com.popcorn.soundtrack&pcampaignid=web_share" target="_blank">
                            <Button style={{backgroundColor:"rgba(33, 33, 33, 1)",marginRight:"6px"}}><img src='/chplay.png'/></Button>
                        </Link>
                        <Button style={{backgroundColor:"rgba(33, 33, 33, 1)"}}><img src='/apple_store.png'/></Button>
                    </div>
                    <div style={{
                        marginTop:"10px"
                    }}>Follow us in:</div>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around"
                    }}> 
                        <Link href="https://www.facebook.com/profile.php?id=61551096965084" target="_blank" style={{
                            height:"30px",
                            display:"flex",
                            alignItems:"center"
                        }}>
                            <img src="logo_fb.png" height="30px"style={{
                                borderRadius:"6px",
                                marginRight:"8px"
                            }}/> <p style={{height:"24px"}}>Facebook</p>
                        </Link>
                        <span style={{
                            fontSize:"16px",
                            fontStyle:"italic",
                            color:"rgba(177, 177, 177, 1)"
                        }}>or</span>
                        <Link href="https://twitter.com/popcorn_sound" target="_blank"style={{
                            height:"30px",
                            display:"flex",
                            alignItems:"center"
                        }}>
                            <img src="logo_tw.png" height="30px" style={{
                                borderRadius:"6px",
                                marginRight:"8px"
                            }}/> <p style={{height:"24px"}}>Twitter</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
