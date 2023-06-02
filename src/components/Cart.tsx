import { useForm } from "react-hook-form";
import {
  useCart,
  useCurrentPage,
  useCheckout,
  useFormStep,
} from "../hooks/hooks";
import { CartItemCard } from "./CartItemCard";
import { FormSteps } from "../helpers/types";

export function Cart({
  setDrawerIsOpen,
}: {
  setDrawerIsOpen: (isOpen: boolean) => void;
}) {
  const { cart } = useCart();
  const { totalQuantity, applyDiscount } = useCheckout();
  const { setCurrentPage } = useCurrentPage();
  const { register, handleSubmit } = useForm();
  const { formStep, incrementFormStep } = useFormStep();
  const nextSteps: any = {
    [FormSteps.CART]: "Shipping",
    [FormSteps.SHIPPING]: "Payment",
    [FormSteps.PAYMENT]: "Summary",
  };

  return (
    <>
      <div className="h-1/2 overflow-y-scroll pb-4">
        {totalQuantity > 0 ? (
          <div className="flex flex-col gap-3">
            {cart.map((product) => (
              <CartItemCard key={product.id} cartItem={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 rounded-lg bg-neutral-300 text-black font-semibold">
            <p>Your cart is currently empty.</p>
            <a
              className="underline cursor-pointer"
              onClick={() => {
                setCurrentPage("store");
                setDrawerIsOpen(false);
              }}
            >
              Click here to checkout our selections
            </a>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit((promoCode) =>
          applyDiscount(promoCode.promoCode)
        )}
        className="my-3 mx-3 py-2 bg-white flex rounded-lg justify-between px-4 shadow-md"
      >
        <input
          {...register("promoCode")}
          placeholder="Promo Code"
          className="text-lg w-2/3 outline-none font-code"
        />
        <button className=" bg-black text-white px-5 py-2 rounded-xl">
          Apply
        </button>
      </form>
      <div className="absolute bottom-0 left-0 w-full px-4 pb-4 flex justify-center items-center mt-8 text-white text-lg font-medium">
        <button
          disabled={cart.length === 0}
          onClick={incrementFormStep}
          className="flex px-16 py-3 bg-black rounded-full transition-all hover:bg-neutral-800 disabled:opacity-40 disabled:pointer-events-none"
        >
          Proceed to {nextSteps[formStep]}
        </button>
      </div>
    </>
  );
}
