import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    position,
    address,
    error: addressError,
    status: addressStatus,
  } = useSelector((state) => state.user);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const orderPrice = totalCartPrice + priorityPrice;
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === "loading";

  const handleGetPosition = (e) => {
    e.preventDefault();

    dispatch(fetchAddress());
  };

  const formErrors = useActionData();
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-6 py-4">
      <h2 className=" mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" action="/order/new">
        <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input"
            defaultValue={username || ""}
            required
          />
        </div>

        <div className=" mb-5 flex flex-col gap-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className=" sm:basis-40">Phone number</label>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="text-end text-sm text-red-500">
              ⚠️{formErrors.phone}
            </p>
          )}
        </div>
        <div className="  mb-5 flex flex-col gap-1">
          <div className=" relative flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className=" sm:basis-40">Address</label>
            <input
              type="text"
              defaultValue={address}
              name="address"
              disabled={isLoadingAddress}
              className="input"
              required
            />
            {(!position?.longitude || !position?.latitude) && (
              <span className="absolute bottom-0 right-0 z-50">
                <Button
                  disabled={isLoadingAddress}
                  type="primary"
                  onClick={handleGetPosition}
                >
                  Get Positon
                </Button>
              </span>
            )}
          </div>
          {addressStatus === "error" && (
            <p className="text-end text-sm text-red-500">
              ⚠️{addressError}. Make sure to fill this field!
            </p>
          )}
        </div>

        <div className="mb-8 flex items-center gap-4">
          <input
            className=" h-4 w-4 accent-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className=" font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position?.latitude && position?.longitude
              ? `${position.latitude},${position.longitude}`
              : ``
          }
        />

        <div>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing Order..."
              : "Order now for " + formatCurrency(orderPrice)}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";
  if (Object.keys(errors).length > 0) return errors;
  console.log(order);

  const newOrder = await createOrder(order);
  // Do Not over use
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
