import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { apiToken } from "../api/ApiKey";

const baseUrl = 'https://api.themoviedb.org/3'

export default function Search(){
    const searchParam = useParams()
    const currentPage = Number(searchParam.page)
    const [rawData, setRawData] = useState({})
    const [filmInfos, setFilmInfos] = useState([])
    console.log(searchParam)

    useEffect(() => {
        const option = {
            method: "GET",
            headers:{
                accept: "application/json",
                Authorization: `Bearer ${apiToken}`
            }
        }

        if(searchParam){
            fetch(`${baseUrl}/search/movie?query=${searchParam.film}&include_adult=false&page=${currentPage}`,option)
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

                    const filmDatas = data.results.map(film => ({
                        ...film,
                        param: formateTitle(film.title)
                    }))
                    
                    setFilmInfos(filmDatas)
                })
                .catch(err => console.error(err.message))
        }
    },[searchParam.film, currentPage])

    function formateTitle(title){
        return title.replace(/\s+/g, "-").toLowerCase()
    }

    if(filmInfos){
        console.log(filmInfos)
    }

    return(
        <div className="site-content">
            <h1>This is {searchParam.film} film on {searchParam.page} page</h1>
            <div className="imgs-container">
                {
                    filmInfos?.map(film => {
                        return(
                            <Link to={`/film/${film.param ?? film.id}`} key={film.id} state={{ ...film, searchParam }}>
                                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} className="poster" />
                            </Link>
                        )
                    })
                }
            </div>
            <nav aria-label="pagination">
                {currentPage !== 1 && <Link to={`/search/${searchParam.film}/page/${currentPage - 1}`}>Previous</Link>}
                {rawData.page < rawData.total_pages && <Link to={`/search/${searchParam.film}/page/${currentPage + 1}`}>Next</Link>}
            </nav>
        </div>

    )
}