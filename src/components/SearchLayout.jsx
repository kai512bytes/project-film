import { Outlet } from "react-router-dom"
import SearchBox from "./SearchBox"

export default function SearchLayout(){

    return(
        <>
            <SearchBox />
            <Outlet />
        </>
    )
}