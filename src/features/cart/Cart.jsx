import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {cart.length !== 0 ? (
        <>
          <h2 className="mt-7 text-2xl font-semibold">Your cart, {username}</h2>

          <ul className=" mt-3 divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </ul>

          <div className=" mt-6 space-x-2">
            <Button type="primary" to="/order/new">
              Order pizzas
            </Button>
            <Link></Link>
            <Button onClick={handleClearCart} type="secondary">
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <h2 className="mt-7 text-lg font-semibold">
          Your cart is still empty. Start adding some pizzas :)
        </h2>
      )}
    </div>
  );
}

export default Cart;
