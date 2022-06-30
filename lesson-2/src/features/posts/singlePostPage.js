import { useSelector } from "react-redux";
import { getPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";


const SinglePostPage =() =>{
    const { postId } =useParams();
    console.log(postId);
    const post = useSelector((state)=> getPostById(state,Number(postId)));
    console.log(post);

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
            <p>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timeStamp = {post.data}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
    )
}


export default SinglePostPage;