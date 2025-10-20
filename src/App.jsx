import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Film from "./pages/Film"
import Lists from "./pages/Lists"
import SearchLayout from "./components/SearchLayout"

export default function App(){
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
				<Route element={<SearchLayout/>}>
					<Route index element={<Home />} />
					<Route path="search/:searchInput/page/:page" element={<Search />} />
				</Route>              
            	<Route path="film" element={<Film />} />
				<Route path="lists" element={<Lists />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}