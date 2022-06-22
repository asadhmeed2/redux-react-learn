
import { useSelector, useDispatch } from 'react-redux';
import {increment , decrement} from './counterSlice';


const Counter = () => {
    const count = useSelector((state)=> state.counter.count);
    const despatch = useDispatch();

  return (
    <section>
        <p>{count}</p>
        <div>
            <button onClick = {()=>{despatch(increment())}}>+</button>
            <button onClick = {()=>{despatch(decrement())}}>-</button>
        </div>
    </section>
    
  )
}

export default Counter