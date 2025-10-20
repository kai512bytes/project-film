import { Outlet, useSearchParams } from "react-router-dom"
import SearchBox from "./SearchBox"

export default function SearchLayout(){
    const [searchParams, setSearchParams] = useSearchParams()

    return(
        <>
            <SearchBox />
            <Outlet />
        </>
    )
}