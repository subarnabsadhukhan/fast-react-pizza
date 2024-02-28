import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantity, increaseQuantity } from "./CartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className=" ml-auto  mr-2 flex items-center justify-between gap-2 md:gap-2">
      <Button type="round" onClick={() => dispatch(increaseQuantity(pizzaId))}>
        +
      </Button>
      <span className=" text-sm font-medium md:text-sm">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(decreaseQuantity(pizzaId))}>
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
