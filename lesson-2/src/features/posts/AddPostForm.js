import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

import './posts.style.css'

const AddPostForm = () => {
    const despatch = useDispatch();

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [userId,setUserId] = useState('');
    
    const users = useSelector(selectAllUsers)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const onSaveHandler = () =>{
       title.length && content.length && userId && despatch(postAdded( title, content, userId ));
       setTitle('');
       setContent('');
       setUserId('');
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value ={user.id}>
            {user.name}
        </option>
    ))

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    return (<section>
            <h2>Add a New Post</h2>
            <form className='post-form'>
                <label htmlFor='postTitle'>Post Title</label>
                <input type='text' name='postTitle' post-form-item ='postFormItem' id="postTitle" value={title} onChange={onTitleChanged}/>

                <label htmlFor ='postAuthor'>Author</label>
                <select id='postAuthor' post-form-item ='postFormItem' value={userId} onChange={onAuthorChanged}>
                    <option value=''></option>
                    {usersOptions}
                </select>

                <label htmlFor='postContent'>Content</label>
                <textarea name='postContent' post-form-item ='postFormItem' id='postContent' text-area='postContent'value = {content} onChange={onContentChanged}/>

                <button type='button' post-form-item ='postFormItem' onClick={onSaveHandler} disabled={!canSave}>Save Post</button>
            </form>
    </section>
    )
}

export default AddPostForm;