import React,{useEffect,useState} from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'



const AvailableMeals = () => {
  const[meals,setmeals]=useState([])
  const [isloading,setloading]=useState(true);
  const [httperror,sethttperror]=useState();
  useEffect(()=>{
    const fetchmeals=async()=>{
      const response=await fetch('https://react-http-4c2b3-default-rtdb.firebaseio.com/meal.json')
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responsedata=await response.json()
      const loadedmeals=[]
      for(const key in responsedata){
        loadedmeals.push({
          id:key,
          name:responsedata[key].name,
          description:responsedata[key].description,
          price:responsedata[key].price
        })
      }
      setmeals(loadedmeals)
      setloading(false)

    }
    fetchmeals().catch(error=>{
      setloading(false)
      sethttperror(error.message)
    })
   
   
  },[])
  if(isloading){
    return(
      <section className={classes.loading}><p>Loading...</p></section>
    )
  }
  if(httperror){
    return(
      <section className={classes.error}>
      <p>{httperror}</p>
    </section>

    )
   
  }

    const mealslist=meals.map((meal)=><MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
    return(
        
          <section className={classes.meals}>
          <Card>
        <ul>{mealslist}</ul>
        </Card>
        
        </section>
        
        
        
    )

}


    

export default AvailableMeals
