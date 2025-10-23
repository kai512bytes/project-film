import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { apiToken } from "../api/ApiKey";

const baseUrl = 'https://api.themoviedb.org/3'

export default function Search(){
    const param = useParams()
    const currentPage = Number(param.page)
    const [rawData, setRawData] = useState({})
    const [filmInfos, setFilmInfos] = useState([])

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

                    const filmDatas = data.results.map(film => ({
                        ...film,
                        param: formateTitle(film.title)
                    }))
                    
                    setFilmInfos(filmDatas)
                })
                .catch(err => console.error(err.message))
        }
    },[param.film, currentPage])

    function formateTitle(title){
        return title.replace(/\s+/g, "-").toLowerCase()
    }

    if(filmInfos){
        console.log(filmInfos)
    }

    return(
        <div className="site-content">
            <h1>This is {param.film} film on {param.page} page</h1>
            <div className="imgs-container">
                {
                    filmInfos?.map(film => {
                        return(
                            <Link to={`/film/${film.param ?? film.id}`} key={film.id} state={
                                {
                                    ...film
                                }
                            }>
                                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} className="poster" />
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