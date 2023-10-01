import LayOutDefault from '@/components/LayOut/LayOutDefault';
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import * as React from 'react';
import style from "@/styles/contact.module.scss"
import {toast} from "react-toastify"
interface contactInterface {
}
const darkTheme = createTheme ({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
interface formContact{[key:string]:any}
function Contact (props: contactInterface) {
  const [formContact,setFormContact] = React.useState<formContact>({
    fname:"",
    lname:"",
    email:"",
    content:""
  })
  return (
 <ThemeProvider theme={darkTheme}>
    <div style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
        color:style.textColor,
        padding:"0px 20px 20px 20px"
    }}>
        <div>
          <form 
            onChange={(e)=>{
              
              let formData:{[key:string]:any} = {
                ...formContact,
              }
              formData[(e.target as HTMLInputElement).name] = (e.target as HTMLInputElement).value
              setFormContact({
                ...formData,
              })
            }}

            onSubmit={(e)=>{
              e.preventDefault()
              toast("Submitted successfully. Thank you for contacting.", {type:"success",autoClose:3000})
              setFormContact({
                fname:"",
                lname:"",
                email:"",
                content:""
              })
            }}

            style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              flexDirection:"column",
              width:"100%",
              maxWidth:"1200px"  
            }}
          >
            <h1>Contact Us</h1>
            <p>The website is in the process of finishing. If you encounter any problems when using the website or have comments. Please fill out the form below.</p>
            <TextField id="outlined-basic" label="First Name" variant="outlined" margin='normal' required name="fname" value={formContact.fname}/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" margin='normal' required name="lname"value={formContact.lname}/>
            <TextField id="outlined-basic" label="Email" variant="outlined" margin='normal'required name="email" type="email" value={formContact.email}/>
            <TextField id="filled-multiline-static" multiline label="Content" variant="outlined" margin='normal'rows={4} required name="content"value={formContact.content}/>
            <div style={{
              width:"100%",
              display:"flex",
              justifyContent:"center",
              marginTop:"20px"
            }}> 
              <Button variant="contained" style={{width:"100%",maxWidth:"500px", backgroundColor:"rgba(252, 41, 71, 1)"}} type="submit">Submit</Button>
            </div>
          </form>
        </div>
    </div>
 </ThemeProvider>
    
  );
}



export default function Movies() {
    return (
      <div>
        <Head>
          <title>Soundtrack form Movies & TVShows | Popcornsound</title>
          <meta name="description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
  
          <meta property="og:description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
          <meta property="og:image" content="https://popcornsound.com/cover_popcorn_sound.png" />
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:creator" content="@PopcornSound" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://popcornsound.com" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
  
          <link rel="icon" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
        </Head>
        <LayOutDefault child={<Contact />} currentRoute="Contact" />
      </div>
    )
  }