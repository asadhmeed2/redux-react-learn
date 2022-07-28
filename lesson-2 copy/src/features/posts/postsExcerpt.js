import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {Link} from "react-router-dom";

// part of the state normalization solution
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSliceRTK";
import './posts.style.css';


const PostsExcerpt = ({ postId }) => {

  // part of the state normalization solution
  const post = useSelector(state=>selectPostById(state, postId));

  return (
    <article className='post'>
            <h2 className='post-title'>{post?.title}</h2>
            <p className='post-content'>{post?.body?.substring(0,75)}...</p>
            <div className ='postCredits'>
                <div>
                <Link to={`post/${post?.id}`}>View Post</Link>
                </div>
                <PostAuthor userId = { post?.userId }/> 
                <TimeAgo timestamp={post?.date}/>
            </div>
            <ReactionButtons post={post}/>
        </article>
  )
}

export default PostsExcerpt;

//to solve the problem of rerender all the post when the user press a reation button, we use on of two solutions
/**\
 * A. react solution
 *  1.import react
 *    inport React from 'react'
 *  2.change const to let of the component 
 *    const postsExcerpt = ({post}) -> let postsExcerpt=({post})
 *  3.
 *    PostssExcerpt = rReact.memo(PostsExcerpt)
 * 
 * this solution well reander the component only when the prop data change
 * 
 * B. state Normalization (Recommended)
 *  1.import createEntityAdapter from @reduxjs/toolkit
 *  2.init adapter with createEntityAdapter
 *  3.change initialState with adapter.getInitialState({})
 *  4.change in reactionAdded the existionPost = state.entities[postId]
 *  5.in the builder cases with fulfilled and change the line when updating the state with the adapter functions
 *  6.asapter.getSelectors add some selectors so we can use them
 *  look in the postsSlice.js
 *  7.change the postList Component 
 *  
 *  
 */