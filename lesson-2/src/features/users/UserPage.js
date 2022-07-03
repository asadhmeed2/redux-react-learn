import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectAllPosts } from "../posts/postsSlice"
import { getUserById } from "./usersSlice"


const UserPage = () => {
    const { userId } =useParams()
    const user =useSelector(state=> getUserById(state,Number(userId)));
    
    const postsForUser = useSelector(state=>{
    const posts =selectAllPosts(state);
        return posts.filter(post=> post.userId === Number(userId));
    })
    const postTitles = postsForUser.map(post=>(
    <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
    ))

    return (
    <section>
        <h2>{user?.name}</h2>

        <ol>{postTitles}</ol>
    </section>
    )
}

export default UserPage