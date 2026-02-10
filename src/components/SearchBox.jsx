import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBox(){
    
    const [searchInput, setSearchInput] = useState("")


    function generateLinkString(searchInput){
		if(searchInput === ""){
			return "/search/page/notfound"
		}
        const formattingInput = searchInput.replace(/\s+/g, "-").toLowerCase()
		return `/search/${formattingInput}/page/1`
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
