import { useLocation } from "react-router-dom"
export default function Film(){
    const location = useLocation()

    return (
        <div className="site-content">
            <h1>This is {location.state.title} page</h1>
        </div>
    )
}