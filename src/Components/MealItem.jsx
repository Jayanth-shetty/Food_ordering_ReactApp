import { currencyFormatter } from "../Utils/formatter.js";
import CartContext from "../Store/CartContext.jsx";
import Button from "../UI/Button.jsx";
import { useContext } from "react";

export default function MealItem({meal}){
    const cartCtx=useContext(CartContext);

function handelAddMealToCart(){
    cartCtx.addItem(meal);

}

    return(
        <li className="meal-item">
            <article>   
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                        <p className="meal-item-description">{meal.description}</p>
                        <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                </div>
                <p className="meal-item-action">
                    <Button onClick={handelAddMealToCart}>Add-To-Cart</Button>
                </p>
            </article>
        </li>
    )
}