import React,{Fragment} from 'react'
import classes from './Modal.module.css'
import ReactDom from 'react-dom'
const Backdrop=props=>{
    return <div className={classes.backdrop} onClick={props.onClose} />
};
const Modaloverlay=props=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}
const portal=document.getElementById('overlays');
const Modal = (props) => {
    return (
        <Fragment>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>,portal)}
            {ReactDom.createPortal(<Modaloverlay>{props.children}</Modaloverlay>,portal)}
        </Fragment>

        
    )
}

export default Modal
