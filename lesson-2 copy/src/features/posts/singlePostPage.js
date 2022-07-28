import { useSelector } from "react-redux";
import { selectPostById } from "./postsSliceRTK";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams, Link } from "react-router-dom";



const SinglePostPage =() =>{
    const { postId } =useParams();
    console.log(postId);
    const post = useSelector((state)=> selectPostById(state,Number(postId)));

    if(!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div>
                <div>
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                </div>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timeStamp = {post.data}/>
            </div>
            <ReactionButtons post={post}/>
        </article>
    )
}


export default SinglePostPage;