import { useRef,useState } from 'react';
import classes from './CheckOut.module.css';


const isempty=val=>val.trim()===''
const isfivechar=val=>val.trim().length===5
const CheckOut = (props) => {
  const [formvalidity,setformvalidity]=useState({
    name:true,
    street:true,
    postalcode:true,
    city:true
  })
    const nameref=useRef();
    const streetref=useRef();
    const postalref=useRef();
    const cityref=useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredname=nameref.current.value;
    const enteredstreet=streetref.current.value;
    const enteredpostal=postalref.current.value;
    const enteredcity=cityref.current.value;
  
    const enternamevalid=!isempty(enteredname)
    const enterstreetvalid=!isempty(enteredstreet)
    const entercityvalid=!isempty(enteredcity)
    const enterpostalvalid=isfivechar(enteredpostal)

    setformvalidity({
      name:enternamevalid,
      street:enterstreetvalid,
      postalcode:enterpostalvalid,
      city:entercityvalid
    })

    const isformvalid=enternamevalid && enterstreetvalid && enterpostalvalid && entercityvalid

    if(!isformvalid){
      return
    }
    props.onConfrim({
      name:enteredname,
      street: enteredstreet,
      postal: enteredpostal,
      city: enteredcity
    })

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formvalidity.name?'':classes.invalid} `}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameref} />
        {!formvalidity.name && <p>Please enter valid name.</p>}
      </div>
      <div className={`${classes.control} ${formvalidity.street?'':classes.invalid} `}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetref} />
        {!formvalidity.street && <p>Please enter valid street.</p>}
      </div>
      <div className={`${classes.control} ${formvalidity.postalcode?'':classes.invalid} `}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalref} />
        {!formvalidity.postalcode && <p>Please enter valid postal code (5 characters).</p>}
      </div>
      <div className={`${classes.control} ${formvalidity.city?'':classes.invalid} `}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityref} />
        {!formvalidity.city && <p>Please enter valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;