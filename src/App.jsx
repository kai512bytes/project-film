import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Film from "./pages/Film"
import Lists from "./pages/Lists"
import SearchLayout from "./components/SearchLayout"
import NotFound from "./pages/NotFound"

export default function App(){
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
				<Route element={<SearchLayout/>}>
					<Route index element={<Home />} />
					<Route path="search/:film/page/:page" element={<Search />} />
            		<Route path="search/page/notfound" element={<NotFound />} />
				</Route>              
        		<Route path="film/:title" element={<Film />} />
				<Route path="lists" element={<Lists />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}