import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header>
            <nav>
                <Link to="/">
                    <div className="logo">
                        <h1>Find your film</h1>
                    </div>
                </Link>
                <Link to="lists">My watclists</Link>
            </nav>  
        </header>
    )
}