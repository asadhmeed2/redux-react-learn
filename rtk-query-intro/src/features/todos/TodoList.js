import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const TodoList = () => {

    const [newTodo,setNewTodo] =useState('');

    const handleSubmit = (e)=>{
    e.preventDefault();

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
  return (
    <div>TodoList</div>
  )
}

export default TodoList