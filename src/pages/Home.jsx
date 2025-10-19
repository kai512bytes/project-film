import { useState, useEffect } from "react"
import { apiToken } from "../api/ApiKey"

export default function Home(){

    const baseUrl = 'https://api.themoviedb.org/3'
    const [input, setInput] = useState(null)
    const [films, setFilms] = useState([])

    useEffect(() => {
        const option = {
            method: "GET",
            headers:{
                accept: "application/json",
                Authorization: `Bearer ${apiToken}`
            }
        }

        if(input){
            fetch(`${baseUrl}/search/movie?query=${input}&include_adult=false`,option)
                .then(
                    res => {
                        if(!res.ok) {
                            throw new Error(res.statusText)
                        }
                        return res.json()
                    }
                )
                .then(data => {
                    console.log(data)
                    setFilms(data.results)
                })
                .catch(err => console.log(err.message))
        }
    },[input])

    function search(formData){
        const query = formData.get("query")
        setInput(query)
    }

    return (
        <div className="site-content">
            <form action={search} className="search-box">
                <input 
                    type="search" 
                    placeholder="Search the film"
                    name="query"
                    />
                <button type="submit">Search</button>
            </form>
            <div className="imgs-container">
                {films.length > 0 && films.map((film) =>{
                    return (
                        film.poster_path 
                        ? <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />
                        : <div className="no-film-poster"></div>
                    )
                })}
            </div>
        </div>
    )
}