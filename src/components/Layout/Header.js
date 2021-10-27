import {Fragment} from 'react'

import mealsimage from '../assets/meals.jpg'
import classes from './Header.module.css';
import HeaderCardButton from './HeaderCardButton';

const Header = (props) => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCardButton onClick={props.onShowcart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsimage} alt="food"  />
            </div>
            
        </Fragment>
    )
}

export default Header