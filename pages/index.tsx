import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LayOutDefault from '@/components/LayOut/LayOutDefault'
import BoxContainer from '@/components/boxContainer/BoxContainer'

export interface Tag{
  title:string,
  path:string,
  details?:string,
  description?:string,
  author?:string
}
function Container(){
  const ListFilm=[
    { title:"Thor love and thunder (2022)",
      path:"film1.png",
      details:"20 songs \nActions, science fiction1",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film2.png",
      details:"20 songs \nActions, science fiction4",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film3.png",
      details:"20 songs \nActions, science fiction3",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film4.png",
      details:"20 songs \nActions, science fiction2",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film5.png",
      details:"20 songs \nActions, science fiction3",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film1.png",
      details:"20 songs \nActions, science fiction5",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film2.png",
      details:"20 songs \nActions, science fiction6",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film3.png",
      details:"20 songs \nActions, science fiction4",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film4.png",
      details:"20 songs \nActions, science fiction7",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },{
      title:"Thor love and thunder (2022)",
      path:"film5.png",
      details:"20 songs \nActions, science fiction4",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct."
    },
  ]

  const ListSound=[
    {
      title:"Pink Venom",
      path:"song1.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Black pink"
    },{
      title:"Night Dance",
      path:"song2.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Black pink"
    },{
      title:"Tilte",
      path:"song3.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Black pink"
    },{
      title:"Tilte",
      path:"song4.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Black pink"
    },{
      title:"Tilte",
      path:"song5.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Black pink"
    },{
      title:"Tilte",
      path:"song1.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "YOASOBI"
    },{
      title:"Tilte",
      path:"song2.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Artist"
    },{
      title:"Tilte",
      path:"song3.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Artist"
    },{
      title:"Tilte",
      path:"song4.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Artist"
    },{
      title:"Tilte",
      path:"song5.png",
      details:"20 songs \nActions, science fiction",
      description:"Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      author: "Artist"
    },
  ]

  return (
    <div style={{
      width:"100%",
      minWidth:"300px",
      display:"flex",
      flexDirection:"column",
      alignContent:"center",
      justifyContent:"center",
      alignItems:"center",
      justifyItems:"center"
    }}>
      <div>
        <img src='/album.png' style={{
          width:"calc(100vw - 48px)",
          minWidth:"300px",
          maxWidth:"1200px"
        }} />
      </div>
      <BoxContainer isFilm={true} list={ListFilm}/>
      <BoxContainer isFilm={false} list={ListSound}/>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Popcorn Sound</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <LayOutDefault child={<Container />} currentRoute="Home"/>
    </div>
  )
}
