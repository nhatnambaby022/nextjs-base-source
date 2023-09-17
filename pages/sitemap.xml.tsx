
import { GetServerSideProps } from "next";
import { Tag } from "./index";
import getAllFilms from "@/api/getAllFilms";
import getAllShows from "@/api/getAllShows";
async function generateSiteMap():Promise<string> {
  const filmRes = await getAllFilms();
  let films = [];
  if (filmRes.data){
    films = filmRes.data
  }

  let shows = [];
  const showRes = await getAllShows();
  if (showRes.data){
    shows = showRes.data
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://popcornsound.com/</loc>
     </url>
     <url>
       <loc>https://popcornsound.com/shows</loc>
     </url>
     <url>
       <loc>https://popcornsound.com/movies</loc>
     </url>
     <url>
       <loc>https://popcornsound.com/terms</loc>
     </url>
     <url>
       <loc>https://popcornsound.com/privacy</loc>
     </url>
     <url>
       <loc>https://popcornsound.com/search?q=</loc>
     </url>
     <url>
       <loc>https://popcornsound.com/contact</loc>
     </url>
     ${films.map((film:Tag) => {
         return `
       <url>
           <loc>https://popcornsound.com/movies/${film.slug}</loc>
       </url>
     `;
       })
       .join('')}
    ${shows.map((show:Tag) => {
        return `
      <url>
          <loc>https://popcornsound.com/shows/${show.slug}</loc>
      </url>
    `;
      })
      .join('')}

     
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps:GetServerSideProps<{}> =  async ({ res })=>{

  res.setHeader('Content-Type', 'text/xml');
  // We generate the XML sitemap with the posts data
  const sitemap = await generateSiteMap();

  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;