import { Link } from "react-router-dom";
import './header.style.css';
import { useSelector, useDispatch } from "react-redux";
import { getCount,increaseCount } from '../features/posts/postsSlice'

const Header = ( )=>{
    const count =useSelector(getCount);
    const dispatch = useDispatch();
    return (
    <header className="nav-container">
        <h1 className="logo">Redux Blog</h1>
        <nav className="nav">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="post" className="nav-link">Posts</Link></li>
            <li><Link to="user" className="nav-link">Users</Link></li>
            <button type='botton' class='count-button' onClick={()=>dispatch(increaseCount())}>{count}</button>
        </nav>
    </header>
    )
}

export default Header;