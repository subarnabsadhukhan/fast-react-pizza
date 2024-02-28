import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
function UpdateOrder() {
  const fetcher = useFetcher();
  const isProcessing =
    fetcher.state === "submitting" || fetcher.state === "loading";
  return (
    <fetcher.Form method="patch" className="text-right">
      <Button disabled={isProcessing} type="primary">
        {isProcessing ? `Processing...` : `Make Priority`}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}
