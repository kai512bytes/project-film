import {BrowserRouter,Routes,Route} from "react-router-dom"
import Layout from "./components/Layout"

export default function App(){
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            	<Route index element={<Home />} />
				<Route path="films" element={<Films />} />
				<Route path="lists" element={<Lists />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}