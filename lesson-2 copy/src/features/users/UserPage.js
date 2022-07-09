import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectPostsByUser } from "../posts/postsSlice"
import { getUserById } from "./usersSlice"


const UserPage = () => {
    const { userId } =useParams()
    const user =useSelector(state=> getUserById(state,Number(userId)));
    
    const postsForUser = useSelector((state)=> selectPostsByUser(state, userId));
    const postTitles = postsForUser.map(post=>(
    <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
    ))

    return (
    <section>
        <h2>{user?.name}</h2>

        <ol style={{marginLeft:'30px'}}>{postTitles}</ol>
    </section>
    )
}

export default UserPage