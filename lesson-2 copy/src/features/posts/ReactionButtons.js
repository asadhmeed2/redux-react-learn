import { useAddNewPostMutation } from "./postsSliceRTK";
import './reactionButtons.style.css';

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ( { post } ) => {

    const [addReaction] =useAddNewPostMutation();
  
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>{
                    const newValue = post.reactions[name] +1
                    addReaction({ postId: post.id, reaction: {...post.reactions,[name]: newValue} })
                }
                }
            >
                {emoji} {post?.reactions[name]}
            </button>
        )
    })
    
    return <div className="reaction-buttons-container">{reactionButtons}</div>

}

export default ReactionButtons