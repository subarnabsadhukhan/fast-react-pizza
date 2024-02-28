import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPizzas, getTotalCartPrice } from "./CartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalCartPrice);
  const totalPizzas = useSelector(getTotalCartPizzas);

  if (!totalPizzas) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
