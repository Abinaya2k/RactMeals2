import React from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef ,useState} from 'react'
const MealItemForm = (props) => {
    const [amountisvalid,setamountisvalid]=useState(true)
    const amountInputRef=useRef();
    const submithandler=event=>{
        event.preventDefault()
        const enteramount=amountInputRef.current.value;
        const enteramountnumber=+enteramount;
        if(enteramount.trim().length===0 || enteramountnumber<1 || enteramountnumber>5){
            setamountisvalid(false)
            return;
        }

        props.onAddToCart(enteramountnumber);


    }
    return (
        <form className={classes.form} onSubmit={submithandler}>
          <Input ref={amountInputRef} label={'Amount'} input={{
              id:'amount__'+props.id,
              type:'number',
              min:'1',
              max:'5',
              step:'1',
              defaultValue:'1'
          }} />
          <button >+Add</button>
          {!amountisvalid && <p>Please enter a valid amount (1-5).</p>}
        
        
        </form>
        
    )
}

export default MealItemForm
