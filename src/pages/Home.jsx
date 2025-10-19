import { useState, useEffect } from "react"
import { apiToken } from "../api/ApiKey"
import {Link, useSearchParams} from "react-router-dom"

export default function Home(){

    const baseUrl = 'https://api.themoviedb.org/3'
    const [searchInput, setSearchInput] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(null)
    const [films, setFilms] = useState([])

    useEffect(() => {
        const option = {
            method: "GET",
            headers:{
                accept: "application/json",
                Authorization: `Bearer ${apiToken}`
            }
        }

        if(searchInput){
            fetch(`${baseUrl}/search/movie?query=${searchInput}&include_adult=false&page=${page}`,option)
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
                    setLastPage(data.total_pages)
                    setFilms(data.results)
                })
                .catch(err => console.log(err.message))
        }
    },[searchInput, page])

    function search(formData){
        const query = formData.get("query")
        if(query !== ""){
            setSearchInput(query)
            setSearchParams({search:query})
            console.log(searchParams)
        }
    }

    function genNewSearchParamString(key, value){
        const newSP = new URLSearchParams(searchParams)
        if(value == null){
            newSP.delete(key)
        }else{
            newSP.set(key, value)
        }
        return `?${newSP.toString()}`
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
                    return <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} className="poster"/> 
                })}
            </div>
            {
                searchInput && (
                    <nav aria-label="pagination">
                        <ul>
                            {
                                page > 1 &&(
                                <li>   
                                        <Link to="..">
                                            <span aria-hidden="true">Previous</span>
                                        </Link>
                                    </li>                       
                                )
                            }
                            {
                                page < lastPage &&(
                                    <li>
                                        <Link to={`${genNewSearchParamString("search", searchInput)}/${page}`} onClick={() => setPage(page + 1)}>
                                        <span aria-hidden="true">Next</span>
                                        </Link>
                                    </li>
                                )                    
                            }
                        </ul>
                    </nav>
                )
            }
            
        </div>
    )
}