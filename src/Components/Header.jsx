import logo from "../assets/logo.jpg";
import Button from "../UI/Button.jsx";
import { useContext } from "react";
import CartContext from "../Store/CartContext.jsx";
import UserProgressContext from "../Store/UserProgressContext.jsx";
export default function Header() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

    function handelShowCart(){
      userProgressCtx.showCart();
    }
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);


  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="FoodApp-Logo" />
        <h1>React-Food-App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handelShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
