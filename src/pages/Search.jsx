import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { apiToken } from "../api/ApiKey";

const baseUrl = 'https://api.themoviedb.org/3'

export default function Search(){
    const param = useParams()
    const currentPage = Number(param.page)
    const [rawData, setRawData] = useState({})
    const [filmsParam, setFilmsParam] = useState([])

    useEffect(() => {
        const option = {
            method: "GET",
            headers:{
                accept: "application/json",
                Authorization: `Bearer ${apiToken}`
            }
        }

        if(param){
            fetch(`${baseUrl}/search/movie?query=${param.film}&include_adult=false&page=${currentPage}`,option)
                .then(
                    res => {
                        if(!res.ok) {
                            throw new Error(res.statusText)
                        }
                        return res.json()
                    }
                )
                .then(data => {
                    setRawData(data)

                    const newParam = data.results.map(film => ({
                        title: film.title,
                        param: formateTitle(film.title),
                        id: film.id,
                        poster: film.poster_path
                    }))
                    
                    setFilmsParam(newParam)
                })
                .catch(err => console.error(err.message))
        }
    },[param.film, currentPage])

    function handleClick(e){
        if(e.target.name === "prev"){
            setSearchParams(page - 1)
        }
        if(e.target.name === "next"){
            setSearchParams(page + 1)
        }
    }

    function formateTitle(title){
        return title.replace(/\s+/g, "-").toLowerCase()
    }

    return(
        <div className="site-content">
            <h1>This is {param.film} film on {param.page} page</h1>
            <div className="imgs-container">
                {
                    filmsParam?.map(film => {
                        return(
                            <Link to={`/film/${film.param}`} key={film.id} state={{title: film.title}}>
                                <img src={`https://image.tmdb.org/t/p/w500${film.poster}`} alt={film.title} className="poster" />
                            </Link>
                        )
                    })
                }
            </div>
            <nav aria-label="pagination">
                {currentPage !== 1 && <Link to={`/search/${param.film}/page/${currentPage - 1}`}>Previous</Link>}
                {rawData.page < rawData.total_pages && <Link to={`/search/${param.film}/page/${currentPage + 1}`}>Next</Link>}
            </nav>
        </div>

    )
}