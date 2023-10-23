/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    // API_URL:"https://boxtube.net/api",
    API_URL:"https://api.popcornsound.com/",
    // API_URL:"http://localhost:5000",
    THE_MOVIE_DB:"https://api.themoviedb.org/3",
    API_KEY:"83cf1b15a4ed3c13cf769946a81f92ee",
  }
}

module.exports = nextConfig
