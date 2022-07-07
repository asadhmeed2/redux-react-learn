import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useGetTodosQuery } from '../api/apiSlice';

const TodoList = () => {

    const [newTodo,setNewTodo] =useState('');

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    }=useGetTodosQuery();


    const handleSubmit = (e)=>{
    e.preventDefault();
    //add todo to state
    setNewTodo('');
}


    const newItemSection = (<form onSubmit ={handleSubmit}>
        <label htmlFor='new-todo'>Enter a new todo item`</label>
        <div className='new-todo'>
            <input 
            id='new-todo' 
            type='text' 
            value={newTodo} 
            onChange={(e)=>setNewTodo(e.target.value)}
            placeholder="Enter new todo"
            />
        </div>
        <button className='submit'>
            <FontAwesomeIcon icon={faUpload}/>
        </button>
  </form>)

  let content;
  if(isLoading){
    content = <p>Loading...</p>
  }else if(isSuccess){
    content = JSON.stringify(todos)//replace with the jsx to render the todo list items
  }else if (isError){
    content =<p>{error}</p>
  }

  return (
    <main>
        {newItemSection}
        {content}
    </main>
  )
}

export default TodoList