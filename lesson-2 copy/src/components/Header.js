import { Link } from "react-router-dom";
import './header.style.css';
import { useSelector, useDispatch } from "react-redux";


const Header = ( )=>{

    const dispatch = useDispatch();
    return (
    <header className="nav-container">
        <h1 className="logo">Redux Blog</h1>
        <nav className="nav">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="post" className="nav-link">Posts</Link></li>
            <li><Link to="user" className="nav-link">Users</Link></li>
        </nav>
    </header>
    )
}

export default Header;