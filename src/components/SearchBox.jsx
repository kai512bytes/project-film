import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBox(){
    
    const [searchInput, setSearchInput] = useState("")

    return(
        <form className="search-box">
            <input 
                type="search" 
                placeholder="Search the film"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />  
            <Link to={`/search/${searchInput}/page/1`}>Search</Link>
        </form>
    )
}