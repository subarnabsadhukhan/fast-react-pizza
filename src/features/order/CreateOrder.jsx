import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  return (
    <div className="px-6 py-4">
      <h2 className=" mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" action="/order/new">
        <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">First Name</label>
          <input type="text" name="customer" className="input" required />
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

        <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Address</label>
          <input type="text" name="address" className="input" required />
        </div>

        <div className="mb-8 flex items-center gap-4">
          <input
            className=" h-4 w-4 accent-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className=" font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Order now"}
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
    priority: data.priority === "on",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
