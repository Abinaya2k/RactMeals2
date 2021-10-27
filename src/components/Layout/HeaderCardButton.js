import React ,{useEffect,useState,useContext} from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCardButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCardButton = (props) => {
    const [btnhighlight,setbtnhighlighted]= useState(false);
    const cartctx=useContext(CartContext)
    const {items}=cartctx
    const btnclasses=`${classes.button} ${btnhighlight?classes.bump:''}`
    useEffect(()=>{
      if(items.length===0){
        return
      }
      setbtnhighlighted(true);

      const timer=setTimeout(() => {
        setbtnhighlighted(false)
      }, 300);

      return()=>{
        clearTimeout(timer)
      }

    },[items])

    
    

  
    return (
      <button className={btnclasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        
      </button>
    );
  };

export default HeaderCardButton
