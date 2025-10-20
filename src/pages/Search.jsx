import { useParams, Link, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { apiToken } from "../api/ApiKey";

const baseUrl = 'https://api.themoviedb.org/3'

export default function Search(){
    const param = useParams()
    const currentPage = Number(param.page)
    const [filmInfo, setFilmInfo] = useState({})

    useEffect(() => {
        const option = {
            method: "GET",
            headers:{
                accept: "application/json",
                Authorization: `Bearer ${apiToken}`
            }
        }

        if(param){
            fetch(`${baseUrl}/search/movie?query=${param.searchInput}&include_adult=false&page=${currentPage}`,option)
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
                    setFilmInfo(data)
                })
                .catch(err => console.error(err.message))
        }
    },[param.searchInput, currentPage])

    function handleClick(e){
        if(e.target.name === "prev"){
            setSearchParams(page - 1)
        }
        if(e.target.name === "next"){
            setSearchParams(page + 1)
        }
    }

    return(
        <div className="site-content">
            <h1 style={{color: "white"}}>This is {param.searchInput} film on {param.page} page</h1>
            <div className="imgs-container">
                {filmInfo.results?.length > 0 && filmInfo.results.map((film) =>{
                    return <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} key={film.id} className="poster"/> 
                })}
            </div>
            <nav aria-label="pagination">
                {currentPage !== 1 && <Link to={`/search/${param.searchInput}/page/${currentPage - 1}`}>Previous</Link>}
                {filmInfo.page < filmInfo.total_pages && <Link to={`/search/${param.searchInput}/page/${currentPage + 1}`}>Next</Link>}
            </nav>
        </div>

    )
}