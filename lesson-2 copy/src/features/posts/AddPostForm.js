import {useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';
import { useAddNewPostMutation } from './postsSliceRTK';

import './posts.style.css'

const AddPostForm = () => {

    const [addNewPost , { isLoading }] =useAddNewPostMutation();
    const navigate = useNavigate();

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [userId,setUserId] = useState('');
    
    const users = useSelector(selectAllUsers)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)
    
    const canSave = [title,content,userId].every(Boolean) && !isLoading;

    const onSaveHandler = async () =>{
        if(canSave){
            try{
                
                await addNewPost({ title ,body: content ,userId}).unwrap()

                setTitle('');
                setContent('');
                setUserId('');
                navigate('/');
            }catch(err){
                console.error('Failed to save the post', err);
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value ={user.id}>
            {user.name}
        </option>
    ))


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