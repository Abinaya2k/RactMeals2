import React ,{useContext,useState}from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './Cartitem'
import CheckOut from './CheckOut'
export const Cart = (props) => {
    const[ischeckout,setcheckout]=useState(false)
    const[issubmitting,setsubmitting]=useState(false)
    const[didsubmit,setdidsubmit]=useState(false)
    const cartctx=useContext(CartContext);
    const totalamount=`$${cartctx.totalAmount.toFixed(2)}`;
    const hasitems=cartctx.items.length>0;
    const cartitemremovehandler=(id)=>{
        cartctx.removeItem(id)
    }
    const cartitemaddhandler=item=>{
        cartctx.addItem({...item,amount:1})
    }
    const orderHandler=()=>{
        setcheckout(true)
    }

    const confirmHandler=async(userdata)=>{
        setsubmitting(true)
        await fetch('https://react-http-4c2b3-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userdata,
                orderlist:cartctx.items
            })
        })
        setsubmitting(false)
        setdidsubmit(true)
        cartctx.clearCart()


    }
    const cartitems=
    <ul className={classes['cart-items']}>
        {cartctx.items.map(item=><CartItem key={item.id} name={item.name} 
        amount={item.amount} price={item.price} onAdd={cartitemaddhandler.bind(null,item)}
         onRemove={cartitemremovehandler.bind(null,item.id)} />)}</ul>
    const cartmodalcontent=
    <React.Fragment>
        {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalamount}</span>
            </div>
            {ischeckout && <CheckOut onConfrim={confirmHandler} onCancel={props.onClose}/>}
            {!ischeckout &&   <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasitems && <button className={classes.button} onClick={orderHandler}>Order</button>}

            </div> }
    </React.Fragment>
    const issubmittingmodalcontent=<p>Sending order data...</p>
    const didsubmitmodalcontent=
        <React.Fragment>
            <p>Successfully sent the order!!!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    return (
        <Modal onClose={props.onClose}>
            {!issubmitting && !didsubmit &&  cartmodalcontent}
            {issubmitting && issubmittingmodalcontent}
            {!issubmitting &&  didsubmit && didsubmitmodalcontent}

        </Modal>
            
            
        
    )
}

export default Cart;
