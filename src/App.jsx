import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Lists from "./pages/Lists"

export default function App(){
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>              
            	<Route index element={<Home />} />
                <Route path="/search" element={<Search />}/>
				<Route path="lists" element={<Lists />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}