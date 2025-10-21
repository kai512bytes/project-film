import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SearchBox(){
    
    const [searchInput, setSearchInput] = useState("")
	const {film} = useParams()

    function generateLinkString(searchInput){
		if(searchInput === ""){
			return "/search/page/notfound"
		}
		return `/search/${searchInput}/page/1`
    }

    return(
        <form className="search-box">
            <input 
                type="search" 
                placeholder="Search the film"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />  
            <Link to={generateLinkString(searchInput)}>Search</Link>
        </form>
    )
}

//searchBox empty string issue
