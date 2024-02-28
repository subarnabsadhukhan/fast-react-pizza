import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addToCart,
  getCurrentQuantityById,
  removeFromCart,
} from "../cart/CartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() {
    dispatch(
      addToCart({
        pizzaId: id,
        quantity: 1,
        name,
        unitPrice,
        totalPrice: unitPrice,
      }),
    );
  }
  function handleDeletePizza() {
    dispatch(removeFromCart(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? `opacity-70 grayscale` : ""}`}
      />
      <div className=" flex grow flex-col">
        <p className=" font-medium">{name}</p>
        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className=" mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className=" text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <>
              {currentQuantity > 0 ? (
                <div className="flex items-center gap-2 sm:gap-5">
                  <UpdateItemQuantity
                    pizzaId={id}
                    currentQuantity={currentQuantity}
                  />
                  <Button onClick={handleDeletePizza} type="small">
                    Delete
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddToCart} type="small">
                  Add to Cart
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
