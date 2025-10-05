import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import {CartContextProvider} from './Store/CartContext.jsx'
import { UserProgressContextProvider } from "./Store/UserProgressContext.jsx";
import CheckOut from "./UI/CheckOut.jsx";
import Cart from "./UI/Cart.jsx";
function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header />
        <Meals/>
        <Cart />  
        <CheckOut />
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
