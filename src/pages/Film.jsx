import { useLocation } from "react-router-dom"

const imgUrl = "https://image.tmdb.org/t/p/w500"

export default function Film(){
    const location = useLocation()
    console.log(location)

    return (
        <div className="site-content">
            <p>Back to search page</p> {/*using Link to search page*/}
            <section>
                <div className="film-img-container">
                    <img src={`${imgUrl}${location.state.poster_path}`} alt={location.state.title} className="poster"/>
                    <div className="film-rating">
                        <p>{`Popularity: ${location.state.popularity}`}</p>
                        <p>{`Vote average: ${location.state.vote_average}`}</p>
                        <p>{`Votes: ${location.state.vote_count}`}</p>
                    </div>
                </div>
                <article>
                    <div className="film-top">
                        <h1>{location.state.title}</h1>
                        <h3>{location.state.release_date}</h3>
                        <h2>{`Directed by ???`}</h2>
                        <button>Add to my watchlist</button>
                    </div>
                    <p>{location.state.overview}</p>
                </article>
            </section>
        </div>
    )
}