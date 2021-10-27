import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals'
import CartProvider from "./store/CartProvider";
function App() {
  const [cartisshoew,setCartshown]=useState(false)

  const showcarthandler=()=>{
    setCartshown(true)
  }
  const hidecarthandler=()=>{
    setCartshown(false)
  }
  return (
    <CartProvider>
      {cartisshoew && <Cart onClose={hidecarthandler} />}
      <Header onShowcart={showcarthandler} />
      <main>
        <Meals/>
      
      </main>
    </CartProvider>
      
    
  );
}

export default App;
