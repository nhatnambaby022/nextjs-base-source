
import { GetServerSideProps } from "next";
import getListFilm from '@/api/getListFilm'
import getListShows from '@/api/getListShows'
import { Tag } from "./index";
async function generateSiteMap():Promise<string> {
  const filmRes = await getListFilm();
  let films = [];
  if (filmRes.data){
    films = filmRes.data.data
  }

  let shows = [];
  const showRes = await getListShows();
  if (showRes.data){
    shows = showRes.data.data
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
          <loc>https://popcornsound.com/movies/${show.slug}</loc>
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