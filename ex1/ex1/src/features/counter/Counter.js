
import { useState ,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {increment , decrement ,reset , incrementByAmount} from './counterSlice';


const Counter = () => {
    const count = useSelector((state)=> state.counter.count);
    const despatch = useDispatch();
    const [amount,setAmount] =useState(0);
    const amountRef = useRef();
    

    let addValue = parseInt(amount || 0 );

    const resetAll = ()=>{
        amountRef.current.value =0;
        despatch(reset());
    }

    const amountHandler =(e)=>{
        setAmount(parseInt(e.target.value)) 
    }

  return (
    <section>
        <p>{count}</p>
        <input type="number" id="inc-amount" ref={amountRef} onChange={amountHandler}/>
        <div>
            <button onClick = {()=>{despatch(increment())}}>+</button> 
            <button onClick = {()=>{despatch(decrement())}}>-</button>
            <button onClick = {()=>{resetAll()}}>Reset</button> 
            <button onClick = {()=>{despatch(incrementByAmount(addValue))}}>+n</button> 
        </div>
    </section>
    
  )
}

export default Counter